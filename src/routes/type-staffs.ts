import Router from "express-promise-router";
import { TypeStaffControllers } from "../app/controllers";

const router = Router();

router.route("/")
    .get(TypeStaffControllers.getAll)

export default router;