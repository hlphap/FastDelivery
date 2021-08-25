import Router from "express-promise-router";
import { DVMethodControllers } from "../app/controllers";
import { validateParam, validateBody, dvMethodSchema } from "../middlewares";

const router = Router();

router.route("/")
    .get(DVMethodControllers.getAll)
    .post(
        //validateBody(dvMethodSchema.createDVMethod),
        DVMethodControllers.create
    )

router.route("/:dvMethodID")
    .put(
        validateParam(dvMethodSchema.id, "dvMethodID"),
        DVMethodControllers.update
    )
    .delete(
        validateParam(dvMethodSchema.id, "dvMethodID"),
        DVMethodControllers.deleteOne
    )

export default router;