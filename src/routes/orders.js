const express = require("express");
const router = express.Router();

const orderController = require("../app/controllers/OrderController");

router.get("/:id/statusesNext", orderController.statusesNext);
router.get("/", orderController.index);
router.get("/:id/tracking", orderController.tracking);
router.get("/handling", orderController.handling);
router.get("/fee", orderController.fee);
router.post("/", orderController.create);
router.put("/:id/assignment", orderController.assignmentOrderToStaff);
router.put("/:id/updateStatus", orderController.updateStatus);
router.put("/:id/", orderController.update); //Update Information Order
router.delete("/:id/detailstatuses/:idDetailStatus",orderController.deleteStatus);

module.exports = router;
