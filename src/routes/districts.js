const express = require("express");
const router = express.Router();

//Controller
const districtController = require("../app/controllers/DistrictController");
//CRUD
router.get("/", districtController.index);
router.get("/:id/wards", districtController.getWardByDistrict);
router.get("/:id", districtController.show);
router.post("/", districtController.create);
router.put("/:id", districtController.update);
router.delete("/:id", districtController.delete);

module.exports = router;
