import Router from "express-promise-router";
import { CMStaffControllers } from "../app/controllers";
import { validateParam, validateBody, cmStoreSchema} from "../middlewares";

const router = Router();

router.route("/")
    .get(CMStaffControllers.getAll)
    .post(
        //validate body not complete
        CMStaffControllers.create
    )

router.route("/:cmStaffID")
    .all(validateParam(cmStoreSchema.id, "cmStaffID"))
    .put(
        //validate body not complete
        CMStaffControllers.update
    )
    .delete(CMStaffControllers.deleteOne)

export default router;