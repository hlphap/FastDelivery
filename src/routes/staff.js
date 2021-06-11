const express = require("express");
const router = express.Router();

//Controller
const staffController = require("../app/controllers/StaffController");

//CRUD
router.get("/", staffController.index);
router.get("/:id", staffController.show);
router.put("/:id", staffController.update);
router.post("/", staffController.create);
router.delete("/:id", staffController.delete);

module.exports = router;
