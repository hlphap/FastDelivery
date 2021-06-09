//Require Router
const banksRouter = require("./banks");
const storesRouter = require("./stores");
const addressesRouter = require("./addresses");
const districtsRouter = require("./districts");
const wardsRouter = require("./wards");

//const ordersRouter = require("./orders");

function routes(app) {
  app.use("/banks", banksRouter);
  app.use("/stores", storesRouter);
  app.use("/districts", districtsRouter);
  app.use("/wards", wardsRouter);
  app.use("/addresses", addressesRouter);
  //app.use("/orders", ordersRouter);
}

module.exports = routes;
