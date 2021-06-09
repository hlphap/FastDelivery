const District = require("../models/District");

class DistrictController {
  //[GET] districts/
  index(req, res, next) {
    District.find({})
      .populate("idBank")
      .then((districts) => {
        res.status(200).json(districts);
      })
      .catch(next);
  }

  //[GET] districts/:id
  show(req, res, next) {
    District.findOne({ _id: req.params.id })
      .then((district) => res.status(200).json(district))
      .catch(next);
  }

  //[POST] districts/
  create(req, res, next) {
    const formData = req.body;
    const district = new District(formData);
    district
      .save()
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }

  //[PUT] districts/:id
  update(req, res, next) {
    const formData = req.body;
    District.updateOne({ _id: req.params.id }, formData)
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }

  //[DELETE] districts/:id
  delete(req, res, next) {
    District.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }
}

module.exports = new DistrictController();
