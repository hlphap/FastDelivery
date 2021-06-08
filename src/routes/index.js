//Require Router
const banksRouter = require("./banks");
const storesRouter = require("./stores");
//const ordersRouter = require("./orders");

function routes(app) {
  app.use("/banks", banksRouter);
  app.use("/stores", storesRouter);
  //app.use("/orders", ordersRouter);
}

module.exports = routes;
