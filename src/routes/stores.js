const express = require("express");
const router = express.Router();

//Controller
const storeController = require("../app/controllers/StoreController");
//CRUD
router.get("/", storeController.index);
router.get("/:id", storeController.show);
router.post("/", storeController.create);
router.put("/:id", storeController.update);
router.delete("/:id", storeController.delete);

module.exports = router;
