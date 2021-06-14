const express = require("express");
const router = express.Router();

const cmStaffController = require("../app/controllers/CMStoreController")

router.get("/", cmStaffController.index);
router.post("/", cmStaffController.create);
router.put("/:id", cmStaffController.update);
router.delete("/:id", cmStaffController.delete);

module.exports = router;

