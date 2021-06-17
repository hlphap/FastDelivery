const Order = require("../models/Order");
const Store = require("../models/Store");
const Ward = require("../models/Ward");
const DeliveryMethod = require("../models/DeliveryMethod");
const StoreController = require("./StoreController");
class OrderController {
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
                    path: "recieverIdAddress",
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
        let fee = 0;
        let surCharges = 0;
        let commission = 0;
        const formQuery = req.query;
        //Get Delivery Method
        const deliveryMethod = DeliveryMethod.findOne({_id: formQuery.idDeliveryMethod})
            .then(deliveryMethod=> deliveryMethod)
            .catch(next);

        //Get Store
        const store = Store.findOne({_id: formQuery.idStore})
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

        //Get idDistrict Reciever Address
        const formRecieverAddress = JSON.parse(formQuery.recieverIdAddress);

        const ward = Ward.findOne({_id: formRecieverAddress.idWard})
            .populate("idDistrict")
            .then(ward => ward)
            .catch(next);

        Promise.all([deliveryMethod, store, ward])
            .then(([deliveryMethod, store, ward])=> {
                const idDistrictStore = store.idAddress.idWard.idDistrict._id;
                const idDistrictReciever = ward.idDistrict._id;
                //Fee no Commission
                if (idDistrictReciever === idDistrictStore){
                    fee = Number(deliveryMethod.innerDistrictFee);
                    if (formQuery.totalWeight > 3){
                        surCharges = deliveryMethod.surCharges * (Number(formQuery.totalWeight) - 3) / 0.5;
                    }
                }else{
                    fee = Number(deliveryMethod.outerDistrictFee);
                    if (formQuery.totalWeight > 3){
                        surCharges = deliveryMethod.surCharges * (Number(formQuery.totalWeight) - 3) / 0.5;
                    }
                }
                //Add Commission
                if (formQuery.isUseCommission){
                    console.log("Phap");
                    commission = store.idCommission.ratioCommission * fee / 100;
                }
                let totalFee = fee + surCharges - commission;
                res.status(200).json({
                    nameMethodDelivery: deliveryMethod.name,
                    fee: fee,
                    surCharges: surCharges,
                    commission: commission,
                    totalFee: totalFee,
                    feeChangeAddressDelivery: 0,
                    feeStorageCharges: 0,
                    feeReturn: 0,
                })
            })
            .catch(next);
    }
}

module.exports = new OrderController();
