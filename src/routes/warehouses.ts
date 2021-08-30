import Router from "express-promise-router";
import { WareHouseControllers } from "../app/controllers";
import { validateParam, wareHouseSchema } from "../middlewares";

const router = Router();

router.route("/")
    .get(WareHouseControllers.getAll)
    .post(
        //validate body
        WareHouseControllers.create
    )

router.route("/:wareHouseID")
    .all(validateParam(wareHouseSchema.id, "wareHouseID"))
    .put(
        //validate body
        WareHouseControllers.update
    )
    .delete(WareHouseControllers.deleteOne)

export default router;