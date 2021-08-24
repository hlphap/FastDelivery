import { Application } from "express";
import dvMethodRouter from "./dv-method"

function routes(app: Application) {
    app.use("/api/dvmethods", dvMethodRouter)
    console.log("Test git commit");
}

export {routes};