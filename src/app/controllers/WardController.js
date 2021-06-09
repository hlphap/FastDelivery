const Ward = require("../models/Ward");

class WardController {
  //[GET] /wards
  index(req, res, next) {
    Ward.find({})
      .populate("idDistrict")
      .then((wards) => res.status(200).json(wards))
      .catch(next);
  }

  //[GET] wards/:id
  show(req, res, next) {
    Ward.findOne({ _id: req.params.id })
      .then((ward) => res.status(200).json(ward))
      .catch(next);
  }

  //[POST] wards
  create(req, res, next) {
    const formData = req.body;
    const ward = new Ward(formData);
    ward
      .save()
      .then(() => res.status(200).json({ result: "1" }))
      .catch(next);
  }

  //[PUT] wards/:id
  update(req, res, next) {
    const formData = req.body;
    Ward.updateOne({ _id: req.params.id }, formData)
      .then(() => res.status(200).json({ result: "1" }))
      .catch(next);
  }

  //[DELETE] wards/:id
  delete(req, res, next) {
    Ward.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ result: "1" }))
      .catch(next);
  }
}

module.exports = new WardController();
