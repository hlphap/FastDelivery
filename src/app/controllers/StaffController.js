const Staff = require("../models/Staff");
const addressController = require("./AddressController");
const CommissionStaff = require("../models/CommissionStaff")

class StaffController {
  //[GET] staffs/
  index(req, res, next) {
    Staff.find({})
      .populate("idCommission")
      .populate("idTypeStaff")
      .populate({
        path: "idAddress",
        populate: {
          path: "idWard",
          model: "wards",
          populate: "idDistrict",
        }
      })
      .then((staffs) => {
        res.status(200).json(staffs);
      })
      .catch(next);
  }

  //[GET] staffs/:id
  show(req, res, next) {
    Staff.findOne({ _id: req.params.id })
      .populate("idCommission")
      .populate("idTypeStaff")
      .populate({
        path: "idAddress",
        populate: {
          path: "idWard",
          model: "wards",
          populate: "idDistrict",
        }
      })
      .then((staff) => res.status(200).json(staff))
      .catch(next);
  }

  //[POST] staffs/
  async create(req, res, next) {
    const formData = req.body;
    const formAddress = JSON.parse(formData.idAddress);
    //Create address
    formData.idAddress = await addressController.create(formAddress);
    //Create staff
    const staff = new Staff(formData);
    staff
      .save()
      .then(()=>
        res.status(200).json({
          status: 200,
          message: "Create Staff Success",
        })
      )
      .catch(next);
  }

  //[PUT] staffs/:id
  update(req, res, next) {
    const formData = req.body;
    const formAddress = JSON.parse(formData.idAddress);

    console.log(formAddress);
    const updateAddress = addressController.update(
      formAddress._id,
      formAddress
    );
    delete formData.idAddress;

    const updateStaff = new Promise((resolve, reject)=> {
      Staff.updateOne({_id: req.params.id}, formData)
        .then(()=> resolve())
        .catch(()=> reject());
    });

    Promise.all([updateAddress, updateStaff])
      .then(()=> {
        res.status(200).json({
          status: 200,
          message: "Update Staff Success",
        })
      })
      .catch(next);
  }

  //[DELETE] staffs/:id
  async delete(req, res, next) {
    const idAddress = await Staff.findById(req.params.id)
      .then((staff)=>staff.idAddress)
      .catch(next);
    addressController.delete(idAddress);
    Staff.deleteOne({ _id: req.params.id})
      .then(()=>{
        res.status(200).json({
          status: 200,
          message: "Delete Staff Success",
        })
      })
      .catch(next);
  }

  //[GET] staffs/login
  login(req,res,next){
    Staff.findOne({
      email: req.query.email,
      password: req.query.password,
    })
    .populate("idCommission")
    .populate("idTypeStaff")
    .populate({
      path: "idAddress",
      populate: {
        path: "idWard",
        model: "wards",
        populate: "idDistrict",
      }
    })
    .then((staff)=>{
      if (staff == null)
        next({
          status: 401,
          message: "Incorrect email or password",
        });
      else res.status(200).json(staff);
    })
    .catch(next);
  }

  //[GET] staffs/:id/commission
  async commission(req, res, next){
    const idCommission = await Staff.findOne({_id: req.params.id})
      .then((Staff)=>Staff.idCommission)
      .catch(next);
    CommissionStaff.findOne({_id: idCommission})
      .then((commission) => res.status(200).json(commission))
      .catch(next);
  }
}

module.exports = new StaffController();
