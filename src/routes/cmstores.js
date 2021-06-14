const express = require("express");
const router = express.Router();

const cmStoreController = require("../app/controllers/CMStoreController");

router.get("/",cmStoreController.index);
router.post("/",cmStoreController.create);
router.put("/:id",cmStoreController.update);
router.delete("/:id",cmStoreController.delete);

module.exports = router;
