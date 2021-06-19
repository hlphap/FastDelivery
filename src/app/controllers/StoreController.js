const Store = require("../models/Store");
const CommissionStore = require("../models/CommissionStore");
const DetailStatus = require("../models/DetailStatus");
const addressController = require("../controllers/AddressController");
const Order = require("../models/Order");
class StoreController {
  //[GET] stores/
  index(req, res, next) {
    Store.find({})
      .populate("idBank")
      .populate("idCommission")
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
      .populate("idCommission")
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
    //Create address
    formData.idAddress = await addressController.create(formAddress);
    const store = new Store(formData);
    store
      .save()
      .then(() =>
        res.status(200).json({
          status: 200,
          message: "Create Store Success ",
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
      .populate("idCommission")
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
            status: 401,
            message: "Incorrect email or password",
          });
        else res.status(200).json(store);
      })
      .catch(next);
  }

  //[GET] stores/:id/commission
  async commission(req, res, next){
    const idCommission = await Store.findOne({_id: req.params.id})
      .then((store)=>store.idCommission)
      .catch(next);
    CommissionStore.findOne({_id: idCommission})
      .then((commission) => res.status(200).json(commission))
      .catch(next);
  }

  //[GET] stores/:id/orders
  orders(req,res,next){
    Order.find({idStore: req.params.id})
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

  //[GET] stores/:id/statistics
  async statistics(req, res, next){
    //Get order in Month
    const a = await Order.find({idStore: req.params.id})
      .then((orders)=>{
        return orders.reduce((result, order)=>{
            if (order.updatedAt.getMonth()== new Date().getMonth()){
              if (order.isHandling){
                result.delivered.orderMoney+=Number(order.orderMoney);
                result.delivered.surCharge+=Number(order.surCharge);
                result.delivered.standardFee+=Number(order.standardFee);
                result.delivered.commission+=Number(order.commission);
                result.delivered.feeChangeAddressDelivery+=Number(order.feeChangeAddressDelivery);
                result.delivered.feeStorageCharges+=Number(order.feeStorageCharges);
                result.delivered.feeReturn+=Number(order.feeReturn);
                result.delivered.totalFee+=Number(order.totalFee);
              }else{
                result.delivering.orderMoney+=Number(order.orderMoney);
                result.delivering.surCharge+=Number(order.surCharge);
                result.delivering.standardFee+=Number(order.standardFee);
                result.delivering.commission+=Number(order.commission);
                result.delivering.feeChangeAddressDelivery+=Number(order.feeChangeAddressDelivery);
                result.delivering.feeStorageCharges+=Number(order.feeStorageCharges);
                result.delivering.feeReturn+=Number(order.feeReturn);
                result.delivering.totalFee+=Number(order.totalFee);
              }
            }
            return result;
        }, {
          delivered: {
            orderMoney : 0,
            standardFee : 0,
            surCharge : 0,
            commission : 0,
            feeChangeAddressDelivery : 0,
            feeStorageCharges: 0,
            feeReturn: 0,
            totalFee: 0,
          },
          delivering:{
            orderMoney : 0,
            standardFee : 0,
            surCharge : 0,
            commission : 0,
            feeChangeAddressDelivery : 0,
            feeStorageCharges: 0,
            feeReturn: 0,
            totalFee: 0,
          }
        })
      })
      .then(statistics=>res.status(200).json(statistics))
      .catch(next);
  }
}

module.exports = new StoreController();
