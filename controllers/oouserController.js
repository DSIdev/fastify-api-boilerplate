const boom = require("boom");
const User = require("../models/OOUser");

async function getData(userID) {
  try {
    let userData = await User.findOne(
      { empID: userID },
      { empID: 1, empName: 1, empEmail: 1, reportees: 1 }
    )
      .lean()
      .exec();
    return userData;
  } catch (error) {
    throw error;
  }
}

async function getHierarchyFor(parent) {
  if (parent && parent.reportees && !parent.reportees.length) {
    return Promise.resolve(parent);
  } else {
    try {
      for (let i = 0; i < parent.reportees.length; i++) {
        let nextEmp = await getData(parent.reportees[i].empID);
        if (nextEmp != null)
          parent.reportees[i] = await getHierarchyFor(nextEmp);
      }
    } catch (ex) {
      throw boom.boomify(ex);
    }
    return Promise.resolve(parent);
  }
}

exports.getH = async (req, res) => {
  if (
    req.params.id == undefined ||
    req.params.id == "" ||
    req.params.id == null
  ) {
    throw boom.badRequest("Missing required parameter.");
  }
  let seed;

  try {
    seed = await User.findById(req.params.id, {
      empID: 1,
      empName: 1,
      empEmail: 1,
      reportees: 1
    })
      .lean()
      .exec();
  } catch (notFoundErr) {
    throw boom.boomify(notFoundErr);
  }

  try {
    result = await getHierarchyFor(seed);
    res.send(result);
  } catch (err) {
    throw boom.boomify(err);
  }
};
