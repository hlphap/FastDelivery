import Router from "express-promise-router";
import bankControllers from "../app/controllers/bank-controllers";

const router = Router();

router.route("/")
    .get(bankControllers.getAll);

export default router;
