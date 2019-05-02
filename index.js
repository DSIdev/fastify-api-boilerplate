// Import App Options
const conf = require("./config/dev");

// Setup logger
const log = require("./logger")();

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  logger: log,
  maxParamLength: 40,
  onProtoPoisoning: "remove"
});

// Require external modules
const mongoose = require("mongoose");

// Import Routes
const routes = require("./routes");

// Import Swagger Options
const swagger = require("./config/swagger");

// Register Swagger
fastify.register(require("fastify-swagger"), swagger.options);

// Connect to DB
mongoose
  .connect(conf.MONGO_URI, { useNewUrlParser: true, autoIndex: false })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Loop over each route
routes.forEach((route, index) => {
  fastify.route(route);
});

// Generates graphical representaion of routes
/* fastify.ready(() => {
     console.log(fastify.printRoutes());
   });
*/

// Run the server!
const start = async () => {
  try {
    await fastify.listen(conf.PORT, "0.0.0.0");
    fastify.swagger();
    // log.info({ a: "xscs" });
    log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
};
start();
