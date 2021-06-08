const express = require("express");
const router = express.Router();

//Controller
const bankController = require("../app/controllers/BankController");
//CRUD
router.get("/", bankController.index);
router.get("/:id", bankController.show);
router.post("/", bankController.create);
router.put("/:id", bankController.update);
router.delete("/:id", bankController.delete);

module.exports = router;
