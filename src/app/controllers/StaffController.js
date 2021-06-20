const Staff = require("../models/Staff");
const Order = require("../models/Order");
const CommissionStaff = require("../models/CommissionStaff");
const TypeStaff = require("../models/TypeStaff");

const addressController = require("./AddressController");

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

    //console.log(formAddress);
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

  //[GET] staffs/login/delivery
  loginStaffDelivery(req,res,next){
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
      if (staff != null && staff.idTypeStaff.level == 1){
        res.status(200).json(staff);
      }else{
         next({
          status: 401,
          message: "Incorrect email or password",
        });
      }
    })
    .catch(next);
  }

  //[GET] staffs/login/manager
  loginStaffManager(req,res,next){
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
      if (staff != null && staff.idTypeStaff.level == 0){
        res.status(200).json(staff);
      }else{
         next({
          status: 401,
          message: "Incorrect email or password",
        });
      }
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
  //[GET] staffs/:id/orders
  orders(req, res, next){
    Order.find({idStaff: req.params.id})
      .populate({
        path: "idPresentStatus",
        populate: "idStatus",
      })
      .populate(
            {
                path: "idStore",
                populate:  {
                    path: "idAddress",
                    populate: {
                        path: "idWard",
                        populate: "idDistrict"
                    }
                }
            }
        )
        .populate(
            {
                path: "idStore",
                populate: "idBank"
            }
        )
        .populate(
            {
                path: "idStore",
                populate: "idCommission"
            }
        )
          .populate(
            {
                path: "receiverIdAddress",
                populate:  {
                        path: "idWard",
                        populate: "idDistrict"
                }
            }
        )
        .populate("idDeliveryMethod")
      .then((orders)=>res.status(200).json(orders))
      .catch(next);
  }

  //[GET] staffs/:id/statistic
  async statistic(req, res, next){
    const staff = await Staff.findOne({_id: req.params.id})
      .populate("idTypeStaff")
      .then(staff=>staff)
      .catch(next);

    if (staff.idTypeStaff.level == 0){
    //Revenue
    const deliveryRevenue = Order.find({})
        .populate({
          path: "idPresentStatus",
          populate: "idStatus",
        })
        .then((orders)=>{
          return orders.reduce((result, order)=>{
            if (order.updatedAt.getMonth()== new Date().getMonth()){
              result.countAllOrder++;
              result.revenue += Number(order.totalFee);
              if (order.idPresentStatus != null){
                if (order.idPresentStatus.idStatus.nameEnglish == "OrderDeliveredSuccessfully")
                  result.countOrderSuccess++;
                else if (order.idPresentStatus.idStatus.nameEnglish == "DeliveryFailed")
                  result.countOrderFailed++;
              }
            }
            return result;
          },{
            revenue: 0,
            countAllOrder : 0,
            countOrderSuccess: 0,
            countOrderFailed: 0,
          })
        })

      //Salary
      const salaryAmount = Staff.find({})
        .then((staffs)=>{
          return staffs.reduce((salaryAmount, staff)=>{
            return salaryAmount + Number(staff.actualSalary);
          },0)
        })

      Promise.all([deliveryRevenue, salaryAmount])
        .then(([deliveryRevenue,salaryAmount])=>{
          let profit = deliveryRevenue.revenue - salaryAmount;
          res.status(200).json({
            deliveryRevenue: deliveryRevenue.revenue,
            salaryAmount: salaryAmount,
            profit: profit,
            countAllOrder: deliveryRevenue.countAllOrder,
            countOrderSuccess: deliveryRevenue.countOrderSuccess,
            countOrderFailed: deliveryRevenue.countOrderFailed,
          })
        })
      }
  }
}

module.exports = new StaffController();
