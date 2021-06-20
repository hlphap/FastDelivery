const { findByIdAndDelete } = require("../models/Warehouse");
const Warehouse = require("../models/Warehouse");
const addressController = require("./AddressController");

class WarehouseController {
  //[GET] /warehouses
  index(req, res, next) {
    Warehouse.find({})
      .populate("idAddress")
      .populate({
        path: "idAddress",
        populate: {
          path: "idWard",
          populate: "idDistrict",
        },
      })
      .then((warehouses) => res.status(200).json(warehouses))
      .catch(next);
  }

  //[GET] /warehouses/:id
  show(req, res, next) {
    Warehouse.findOne({ _id: req.params.id })
      .populate("idAddress")
      .populate({
        path: "idAddress",
        populate: {
          path: "idWard",
          populate: "idDistrict",
        },
      })
      .then((warehouse) => res.status(200).json(warehouse))
      .catch(next);
  }

  //[POST] /warehouses
  async create(req, res, next) {
    const formData = req.body;
    const formAddress = JSON.parse(formData.idAddress);

    //Create address
    formData.idAddress = await addressController.create(formAddress);

    const warehouse = new Warehouse(formData);
    warehouse
      .save()
      .then(() => res.status(200).json({
          status: 200,
          message: "Create WareHouse Success ",
        }))
      .catch(next);
  }

  //[PUT] /warehouses/:id
  update(req, res, next) {
    const formData = req.body;
    const formAddress = JSON.parse(formData.idAddress);
    const updateAddress = addressController.update(
      formAddress._id,
      formAddress,
    );
    delete formData.idAddress;

    const updateWareHouse = new Promise((resolve, reject) => {
       Warehouse.updateOne({ _id: req.params.id }, formData)
      .then(() => resolve())
      .catch(() => reject());
    });

    Promise.all([updateAddress, updateWareHouse])
      .then((result)=>{
        res.status(200).json({ status: 200, message: "Update success" });
      })
      .catch(next);
  }

  //[DELETE] /warehouses/:id
  async delete(req, res, next) {
    const idAddress = await Warehouse.findById(req.params.id)
      .then((warehouse) => warehouse.idAddress)
      .catch(next);

    addressController.delete(idAddress);

    Warehouse.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({
        status: 200,
        message: "Delete success" }
      ))
      .catch(next);
  }
}

module.exports = new WarehouseController();
