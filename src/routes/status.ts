import Router from "express-promise-router";
import { StatusControllers } from "../app/controllers";

const router = Router();

router.route("/")
    .get(StatusControllers.getAll)

router.route("/:statusID/next")
    .get(StatusControllers.getNextStatus);

export default router;
