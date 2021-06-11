const TypeStaff = require("../models/TypeStaff");

class TypeStaffController {
  //[GET] type-staffs/
  index(req, res, next) {
    TypeStaff.find({})
      .then((typeStaffs) => {
        res.status(200).json(typeStaffs);
      })
      .catch(next);
  }

  //[GET] type-staffs/:id
  show(req, res, next) {
    TypeStaff.findOne({ _id: req.params.id })
      .then((typeStaff) => res.status(200).json(typeStaff))
      .catch(next);
  }

  //[POST] type-staffs/
  create(req, res, next) {
    const formData = req.body;
    const typeStaff = new TypeStaff(formData);
    typeStaff
      .save()
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }

  //[PUT] type-staffs/:id
  update(req, res, next) {
    const formData = req.body;
    TypeStaff.updateOne({ _id: req.params.id }, formData)
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }

  //[DELETE] type-staff/:id
  delete(req, res, next) {
    TypeStaff.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }
}

module.exports = new TypeStaffController();
