import Router from "express-promise-router";
import { OrderControllers } from "../app/controllers";

const router = Router();

//Manager
router.route("/")
    .get(OrderControllers.getAll)
    .post(OrderControllers.create)

router.route("/handle")
    .get(OrderControllers.getOrderNotYetHandle)

router.route("/:orderID")
    .put(OrderControllers.update)
    .delete(OrderControllers.deleteOne)


export default router;
