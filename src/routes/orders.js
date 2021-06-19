const express = require("express");
const router = express.Router();

const orderController = require("../app/controllers/OrderController");

router.get("/", orderController.index);
router.get("/handling", orderController.handling);
router.get("/fee", orderController.fee);
router.post("/", orderController.create);
router.put("/:id/assignment", orderController.assignmentOrderToStaff);
router.put("/:id/", orderController.update); //Update Information Order

module.exports = router;
