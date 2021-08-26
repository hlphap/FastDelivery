import Router from "express-promise-router";
import { DistrictControllers } from "../app/controllers";

const router = Router();

router.route("/")
    .get(DistrictControllers.getAll);

export default router;
