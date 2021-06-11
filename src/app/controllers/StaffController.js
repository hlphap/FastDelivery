const Staff = require("../models/Staff");

class StaffController {
  //[GET] staffs/
  index(req, res, next) {
    Staff.find({})
      .populate("idAddress")
      .populate({
        path: "idAddress",
        populate: "idWard",
      })
      .populate("idWard")
      .then((staffs) => {
        res.status(200).json(staffs);
      })
      .catch(next);
  }

  //[GET] staffs/:id
  show(req, res, next) {
    Staff.findOne({ _id: req.params.id })
      .populate("idAddress")
      .populate({
        path: "idAddress",
        populate: "idWard",
      })
      .populate("idWard")
      .then((staff) => res.status(200).json(staff))
      .catch(next);
  }

  //[POST] staffs/
  create(req, res, next) {
    const formData = req.body;
    const staff = new Staff(formData);
    staff
      .save()
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }

  //[PUT] staffs/:id
  update(req, res, next) {
    const formData = req.body;
    Staff.updateOne({ _id: req.params.id }, formData)
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }

  //[DELETE] staffs/:id
  delete(req, res, next) {
    Staff.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }
}

module.exports = new StaffController();
