const Warehouse = require("../models/Warehouse");

class WarehouseController {
  //[GET] /warehouses
  index(req, res, next) {
    Warehouse.find({})
      .populate("idAddress")
      .populate({
        path: "idAddress",
        populate: "idWard",
      })
      .populate("idDistrict")
      .then((warehouses) => res.status(200).json(warehouses))
      .catch(next);
  }

  //[GET] /warehouses/:id
  show(req, res, next) {
    Warehouse.findOne({ _id: req.params.id })
      .populate("idAddress")
      .populate({
        path: "idAddress",
        populate: "idWard",
      })
      .populate("idDistrict")
      .then((warehouse) => res.status(200).json(warehouse))
      .catch(next);
  }

  //[POST] /warehouses
  create(req, res, next) {
    const formData = req.body;
    const warehouse = new Warehouse(formData);
    warehouse
      .save()
      .then(() => res.status(200).json({ result: "1" }))
      .catch(next);
  }

  //[PUT] /warehouses/:id
  update(req, res, next) {
    const formData = req.body;
    Warehouse.updateOne({ _id: req.params.id }, formData)
      .then(() => res.status(200).json({ result: "1" }))
      .catch(next);
  }

  //[DELETE] /warehouses/:id
  delete(req, res, next) {
    Warehouse.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ result: "1" }))
      .catch(next);
  }
}

module.exports = new WarehouseController();
