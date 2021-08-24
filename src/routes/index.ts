import { Application } from "express";
import dvMethodRouter from "./dv-method";
import cmStoreRouter from "./cm-stores";
import cmStaffRouter from "./cm-staff";

function routes(app: Application) {
    app.use("/api/dvmethods", dvMethodRouter)
    app.use("/api/cmstores", cmStoreRouter)
    app.use("/api/cmstaffs", cmStaffRouter)
}

export {routes};