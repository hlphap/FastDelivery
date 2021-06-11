//Require Router
const banksRouter = require("./banks");
const storesRouter = require("./stores");
const districtsRouter = require("./districts");
const wardsRouter = require("./wards");
const typeStaffsRouter = require("./type-staffs");
const staffRouter = require("./staff");
const warehousesRouter = require("./warehouses");
//const ordersRouter = require("./orders");

function routes(app) {
  app.use("/banks", banksRouter);
  app.use("/stores", storesRouter);
  app.use("/districts", districtsRouter);
  app.use("/wards", wardsRouter);
  app.use("/type-staffs", typeStaffsRouter);
  app.use("/staffs", staffRouter);
  app.use("/warehouses", warehousesRouter);
  //app.use("/orders", ordersRouter);
}

module.exports = routes;
