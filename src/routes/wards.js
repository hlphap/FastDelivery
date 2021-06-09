const express = require("express");
const router = express.Router();

//Controller
const wardController = require("../app/controllers/WardController");
//CRUD
router.get("/", wardController.index);
router.get("/:id", wardController.show);
router.post("/", wardController.create);
router.put("/:id", wardController.update);
router.delete("/:id", wardController.delete);

module.exports = router;
