const express = require("express");
const router = express.Router();

//Controller
const staffController = require("../app/controllers/StaffController");

//CRUD
router.get("/:id/orders", staffController.orders);
router.get("/login", staffController.login);
router.get("/:id/commission", staffController.commission);
router.get("/", staffController.index);
router.get("/:id", staffController.show);
router.put("/:id", staffController.update);
router.post("/", staffController.create);
router.delete("/:id", staffController.delete);
module.exports = router;
