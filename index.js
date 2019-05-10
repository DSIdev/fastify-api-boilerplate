// Import App Options
const conf = require("./config/dev");

// Setup logger
const log = require("./logger")();

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  logger: log,
  maxParamLength: 50,
  onProtoPoisoning: "remove"
});

// Require external modules
const mongoose = require("mongoose");

// Import Routes
const routes = require("./routes");

// Connect to DB
mongoose
  .connect(conf.MONGO_URI, { useNewUrlParser: true, autoIndex: false })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("===", err));

// Loop over each route
routes.forEach((route, index) => {
  fastify.route(route);
});

// Generates graphical representaion of routes
/*fastify.ready(() => {
  console.log(fastify.printRoutes());
});
*/

// Run the server!
const start = async () => {
  try {
    await fastify.listen(conf.PORT, "0.0.0.0");
    log.info(`server listening on ${fastify.server.address().port}`);
    console.log(`Listening for incoming requests.`);
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
};
start();
