import { Application } from "express";
import dvMethodRouter from "./dv-methods";
import cmStoreRouter from "./cm-stores";
import cmStaffRouter from "./cm-staffs";
import staffRouter from "./staffs";
import typeStaffRouter from "./type-staffs";
import districtRouter from "./districts";
import wardRouter from "./wards"


function routes(app: Application) {
    app.use("/api/dvmethods", dvMethodRouter)
    app.use("/api/cmstores", cmStoreRouter)
    app.use("/api/cmstaffs", cmStaffRouter)
    app.use("/api/staffs", staffRouter)
    app.use("/api/typestaffs", typeStaffRouter)
    app.use("/api/districts", districtRouter)
    app.use("/api/wards", wardRouter)
}

export default routes;
