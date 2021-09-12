import Router from "express-promise-router";
import { OrderControllers } from "../app/controllers";

const router = Router();

//Manager
router.route("/")
    .get(OrderControllers.getAll)
    .post(OrderControllers.create)

router.route("/handle")
    .get(OrderControllers.getOrderNotYetHandle)

router.route("/fee")
    .get(OrderControllers.calcFee)

router.route("/statistic")
    .get(OrderControllers.statistic)

router.route("/:orderID/status")
    .put(OrderControllers.updateStatus);

router.route("/:orderID")
    .put(OrderControllers.update)
    .delete(OrderControllers.deleteOne)

//Staff

//Shop

export default router;
