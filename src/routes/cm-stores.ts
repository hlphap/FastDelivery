import Router from "express-promise-router";
import { CMStoreControllers } from "../app/controllers";
import { validateParam, validateBody, cmStoreSchema } from "../middlewares";

const router = Router();

router.route("/")
    .get(CMStoreControllers.getAll)
    .post(
        //validateBody(dvMethodSchema.createDVMethod),
        CMStoreControllers.create
    )

router.route("/:cmStoreID")
    .put(
        validateParam(cmStoreSchema.id, "cmStoreID"),
        CMStoreControllers.update
    )
    .delete(
        validateParam(cmStoreSchema.id, "cmStoreID"),
        CMStoreControllers.deleteOne
    )

export default router;
