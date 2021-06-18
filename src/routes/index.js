//Require Router
const banksRouter = require("./banks");
const storesRouter = require("./stores");
const districtsRouter = require("./districts");
const wardsRouter = require("./wards");
const typeStaffsRouter = require("./type-staffs");
const staffsRouter = require("./staff");
const warehousesRouter = require("./warehouses");
const cmStoresRouter = require("./cmstores");
const cmStaffsRouter = require("./cmstaff");
const dvMethodsRouter = require("./dvmethods");
const ordersRouter = require("./orders");

function routes(app) {
  app.use("/banks", banksRouter);
  app.use("/stores", storesRouter);
  app.use("/districts", districtsRouter);
  app.use("/wards", wardsRouter);
  app.use("/type-staffs", typeStaffsRouter);
  app.use("/staffs", staffsRouter);
  app.use("/warehouses", warehousesRouter);
  app.use("/cmstores", cmStoresRouter);
  app.use("/cmstaffs", cmStaffsRouter);
  app.use("/dvmethods", dvMethodsRouter);
  app.use("/orders", ordersRouter);


  // app.use((req, res, next) => {
  //   throw new Error("Something went wrong!");
  // });
  app.use((error, req, res, next) => {
    console.log(error.stack);
    res.status(error.status || 500).send({
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    });
  });
}

module.exports = routes;
