import Router from "express-promise-router";
import {StaffControllers} from "../app/controllers/";
import { validateParam, staffSchema, passport } from "../middlewares";


const router = Router();


//Manager
router.route("/")
    .get(
        StaffControllers.getAll
    )
    .post(
        //Incomplete validate body
        StaffControllers.create
    )

router.route("/manager-signin")
        .post(
        passport.authenticate("local", {session: false}),
        StaffControllers.managerSignIn
    )

router.route("/:staffID/orders")
    .all(validateParam(staffSchema.id, "staffID"))
    .get(StaffControllers.orders)

router.route("/:staffID")
    .all(validateParam(staffSchema.id, "staffID"))
    .put(
        //Incomplete validate body
        StaffControllers.update
    )
    .delete(StaffControllers.deleteOne)

export default router;