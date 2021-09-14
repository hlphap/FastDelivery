import Router from "express-promise-router";
import { StoreControllers } from "../app/controllers";
import { storeSchema, validateParam } from "../middlewares";


const router = Router();

router.route("/")
    .get(StoreControllers.getAll)
    .post(StoreControllers.create);

router.route("/:storeID/statistics")
    .get(StoreControllers.statistics);

router.route("/:storeID")
    .all(validateParam(storeSchema.id, "storeID"))
    .put(
        //Validate body
        StoreControllers.update
    )
    .delete(StoreControllers.deleteOne);

export default router;

