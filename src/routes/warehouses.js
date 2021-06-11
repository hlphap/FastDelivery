const express = require("express");
const router = express.Router();

//Controller
const wareController = require("../app/controllers/WarehouseController");

router.get("/", wareController.index);
router.get("/:id", wareController.show);
router.post("/", wareController.create);
router.put("/:id", wareController.update);
router.delete("/:id", wareController.delete);

module.exports = router;
