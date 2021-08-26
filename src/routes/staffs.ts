import Router from "express-promise-router";
import {StaffControllers} from "../app/controllers/";
import { validateParam, staffSchema } from "../middlewares";
const router = Router();

router.route("/")
    .get(
        StaffControllers.getAll
    )
    .post(
        //Incomplete validate body
        StaffControllers.create
    )

router.route("/:staffID")
    .all(validateParam(staffSchema.id, "staffID"))
    .put(
        //Incomplete validate body
        StaffControllers.update
    )
    .delete(StaffControllers.deleteOne)

export default router;