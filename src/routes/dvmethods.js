const express = require("express");
const router = express.Router();

const deliveryController = require("../app/controllers/DVMethodController");

router.get("/",deliveryController.index);
router.get("/:id",deliveryController.show);
router.post("/",deliveryController.create);
// router.put("/:id",deliveryController.update);
// router.delete("/",deliveryController.delete);

module.exports = router;
