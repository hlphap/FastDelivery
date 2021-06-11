const express = require("express");
const router = express.Router();

//Controller
const TypeStaffController = require("../app/controllers/TypeStaffController");
//CRUD
router.get("/", TypeStaffController.index);
router.get("/:id", TypeStaffController.show);
router.post("/", TypeStaffController.create);
router.put("/:id", TypeStaffController.update);
router.delete("/:id", TypeStaffController.delete);

module.exports = router;
