import Router from "express-promise-router";
import { WardControllers } from "../app/controllers";

const router = Router();

router.route("/")
    .get(WardControllers.getAll);

export default router;
