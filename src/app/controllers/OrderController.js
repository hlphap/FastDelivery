const Order = require("../models/Order");
const Store = require("../models/Store");
const Ward = require("../models/Ward");
const DeliveryMethod = require("../models/DeliveryMethod");

const addressController = require("./AddressController");
const StoreController = require("./StoreController");
class OrderController {
   // [GET] orders/
    index(req, res, next){
        Order.find({})
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
            .then(orders => res.status(200).json(orders))
            .catch(next);
    }

    //[GET] /orders/fee
    async fee(req, res, next){
        const formQuery = req.query;
        const result = await Fee(formQuery, next);
        if (result!=null)
            res.status(200).json(result);
    }

    //[POST] //orders
    async create(req, res, next){
        const formData = req.body;
        console.log(formData);
         //1 Call Function Fee
        const fee = await ChangeFee(formData, next);

        //1.5 Create receiverIdAddress to Addresses
        const formReceiverAddress = JSON.parse(formData.receiverIdAddress);
        formData.receiverIdAddress = await addressController.create(formReceiverAddress);

        //6. Create Order
        const order = new Order(formData);
        order
            .save()
            .then(()=>
                res.status(200).json({
                    status: 200,
                    message: "Create Order Success",
                })
            )
            .catch(next);
    }

    //[PUT] //orders/:id/assignment
    assignmentOrderToStaff(req, res, next){
        const formData = req.body;
        Order.updateOne({_id: req.params.id}, formData)
            .then(()=> res.status(200).json({
                status: 200,
                message: "Assignment To Staff Success",
            }))
            .catch(next);
    }

}

//Tinh phi giao hang
function Fee(formData, next){
        let standardFee = 0;
        let surCharge = 0;
        let commission = 0;
        let feeChangeAddressDelivery = 0;
        let feeStorageCharges = 0;
        let feeReturn = 0;
    //Get Delivery Method
        const deliveryMethod = DeliveryMethod.findOne({_id: formData.idDeliveryMethod})
            .then(deliveryMethod=> deliveryMethod)
            .catch(next);

        //Get Store
        const store = Store.findOne({_id: formData.idStore})
            .populate("idCommission")
            .populate(
                {
                    path: "idAddress",
                    populate: {
                        path: "idWard",
                        model: "wards",
                        populate: "idDistrict",
                    }
                }
            )
            .then((store)=> store)
            .catch(next);

        //Get idDistrict Receiver Address
        const formReceiverAddress = JSON.parse(formData.receiverIdAddress);

        const ward = Ward.findOne({_id: formReceiverAddress.idWard})
            .populate("idDistrict")
            .then(ward => ward)
            .catch(next);

        return Promise.all([deliveryMethod, store, ward])
            .then(([deliveryMethod, store, ward])=> {
                const idDistrictStore = store.idAddress.idWard.idDistrict._id;
                const idDistrictReceiver = ward.idDistrict._id;
                //standardFee no Commission
                if (idDistrictReceiver === idDistrictStore){
                    standardFee = Number(deliveryMethod.innerDistrictFee);
                    if (formData.totalWeight > 3){
                        surCharge = deliveryMethod.surCharge * (Number(formData.totalWeight) - 3) / 0.5;
                    }
                }else{
                    standardFee = Number(deliveryMethod.outerDistrictFee);
                    if (formData.totalWeight > 3){
                        surCharge = deliveryMethod.surCharge * (Number(formData.totalWeight) - 3) / 0.5;
                    }
                }
                //Add Commission
                if (formData.isUseCommission){
                    console.log("Phap");
                    commission = store.idCommission.ratioCommission * standardFee / 100;
                }
                let totalFee = standardFee + surCharge - commission + feeChangeAddressDelivery + feeStorageCharges + feeReturn;
                return {
                    nameMethodDelivery: deliveryMethod.name,
                    standardFee: standardFee,
                    surCharge: surCharge,
                    commission: commission,
                    totalFee: totalFee,
                    feeChangeAddressDelivery: feeChangeAddressDelivery,
                    feeStorageCharges: feeStorageCharges,
                    feeReturn: feeReturn,
                }
            })
            .catch(next);
}

//Create Order and List Fee
async function ChangeFee(formData, next){
    const fee = await Fee(formData);
    formData.standardFee = fee.standardFee;
    formData.surCharge = fee.surCharge;
    formData.commission = fee.commission;
    formData.feeChangeAddressDelivery = fee.feeChangeAddressDelivery;
    formData.feeStorageCharges = fee.feeStorageCharges;
    formData.feeReturn = fee.feeReturn;
    formData.totalFee = fee.totalFee;
}
module.exports = new OrderController();
