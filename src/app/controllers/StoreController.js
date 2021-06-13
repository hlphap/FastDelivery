const Store = require("../models/Store");
const addressController = require("../controllers/AddressController");
class StoreController {
  //[GET] stores/
  index(req, res, next) {
    console.log(req.params);
    Store.find({})
      .populate("idBank")
      .populate({
        path: "idAddress",
        populate: {
          path: "idWard",
          model: "wards",
          populate: "idDistrict",
        },
      })
      .then((stores) => {
        res.status(200).json(stores);
      })
      .catch(next);
  }

  //[GET] stores/:id
  show(req, res, next) {
    Store.findOne({ _id: req.params.id })
      .populate("idBank")
      .populate({
        path: "idAddress",
        populate: {
          path: "idWard",
          model: "wards",
          populate: "idDistrict",
        },
      })
      .then((store) => res.status(200).json(store))
      .catch(next);
  }

  //[POST] stores/
  async create(req, res, next) {
    const formData = req.body;
    const formAddress = JSON.parse(formData.idAddress);
    //Create store
    formData.idAddress = await addressController.create(formAddress);
    const store = new Store(formData);
    store
      .save()
      .then(() =>
        res.status(200).json({
          status: 200,
          message: "Create success ",
        })
      )
      .catch(next);
  }

  //[PUT] stores/:id
  update(req, res, next) {
    const formData = req.body;
    const formAddress = JSON.parse(formData.idAddress);
    const updateAddress = addressController.update(
      formAddress._id,
      formAddress
    );

    delete formData.idAddress;
    const updateStore = new Promise((resolve, reject) => {
      Store.updateOne({ _id: req.params.id }, formData)
        .then(() => resolve())
        .catch(() => reject());
    });

    Promise.all([updateAddress, updateStore])
      .then((result) => {
        res.status(200).json({ status: 200, message: "Update success" });
      })
      .catch(next);
  }

  //[DELETE] stores/:id
  async delete(req, res, next) {
    const idAddress = await Store.findById(req.params.id)
      .then((store) => store.idAddress)
      .catch(next);
    console.log(idAddress);
    addressController.delete(idAddress);
    Store.deleteOne({ _id: req.params.id })
      .then(() =>
        res.status(200).json({ status: 200, message: "Delete success" })
      )
      .catch(next);
  }

  //[GET] stores/login
  login(req, res, next) {
    Store.findOne({
      email: req.query.email,
      password: req.query.password,
    })
      .populate("idBank")
      .populate({
        path: "idAddress",
        populate: {
          path: "idWard",
          model: "wards",
          populate: "idDistrict",
        },
      })
      .then((store) => {
        if (store == null)
          next({
            status: 200,
            message: "Incorrect email or password",
          });
        else res.status(200).json(store);
      })
      .catch(next);
  }
}

module.exports = new StoreController();
