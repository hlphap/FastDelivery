const Address = require("../models/Address");

class AddressController {
  //[GET] addresses/
  index(req, res, next) {
    Address.find({})
      .populate("idWard")
      .populate({
        path: "idWard",
        populate: "idDistrict",
      })
      .then((addresses) => {
        res.status(200).json(addresses);
      })
      .catch(next);
  }

  //[GET] addresses/:id
  show(req, res, next) {
    Address.findOne({ _id: req.params.id })
      .then((address) => res.status(200).json(address))
      .catch(next);
  }

  //[POST] addresses/
  create(req, res, next) {
    const formData = req.body;
    const address = new Address(formData);
    address
      .save()
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }

  //[PUT] addresses/:id
  update(req, res, next) {
    const formData = req.body;
    Address.updateOne({ _id: req.params.id }, formData)
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }

  //[DELETE] addresses/:id
  delete(req, res, next) {
    Address.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }
}

module.exports = new AddressController();
