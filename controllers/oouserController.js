const User = require("../models/OOUser");
const createError = require("http-errors");

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
    return error;
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
    } catch (err) {
      return new createError(err);
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
    return res.send(new createError.BadRequest("Invalid ID"));
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
    return res.send(new createError.NotFound("Unknown ID"));
  }

  try {
    result = await getHierarchyFor(seed);
    res.send(result);
  } catch (err) {
    return res.send(new createError(err));
  }
};
