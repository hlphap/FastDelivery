const express = require("express");
const router = express.Router();

//Controller
const addressController = require("../app/controllers/AddressController");
//CRUD
router.get("/", addressController.index);
router.get("/:id", addressController.show);
router.post("/", addressController.create);
router.put("/:id", addressController.update);
router.delete("/:id", addressController.delete);

module.exports = router;
