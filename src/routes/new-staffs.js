const express = require("express");
const router = express.Router();

const newStaffController = require("../app/controllers/NewStaffController");

router.post("/", newStaffController.create);
router.get("/", newStaffController.index);

module.exports = router;