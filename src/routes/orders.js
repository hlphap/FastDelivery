const express = require("express");
const router = express.Router();

const orderController = require("../app/controllers/OrderController");

router.get("/", orderController.index);
router.get("/fee", orderController.fee);
router.post("/", orderController.create);
router.put("/:id/assignment", orderController.assignmentOrderToStaff);




module.exports = router;
