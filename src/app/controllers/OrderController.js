const Order = require("../models/Order");
const Store = require("../models/Store");
const Ward = require("../models/Ward");
const DeliveryMethod = require("../models/DeliveryMethod");

const addressController = require("./AddressController");
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
        let surCharge = 0;
        let commission = 0;
        const formQuery = req.query;
        const result = await Fee(formQuery, next);
        if (result!=null)
            res.status(200).json(result);
    }

    //[POST] //orders
    async create(req, res, next){
        const formData = req.body;
         //1 Call Function Fee
        const fee = await Fee(formData, next);

        //1.5 Create recieverIdAddress to Addresses
        const formRecieverAddress = JSON.parse(formData.recieverIdAddress);
        formData.recieverIdAddress = await addressController.create(formRecieverAddress);

        //2. Get feeDelivery
        formData.feeDelivery = fee.totalFee;

        //3. Get feeChangeAddressDelivery
        formData.feeChangeAddressDelivery = fee.feeChangeAddressDelivery;

        //4. Get feeStorageCharges
        formData.feeStorageCharges = fee.feeStorageCharges;

        //5. Get feeReturn
        formData.feeReturn = fee.feeReturn;

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
}

function Fee(formData, next){
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

        //Get idDistrict Reciever Address
        const formRecieverAddress = JSON.parse(formData.recieverIdAddress);

        const ward = Ward.findOne({_id: formRecieverAddress.idWard})
            .populate("idDistrict")
            .then(ward => ward)
            .catch(next);

        return Promise.all([deliveryMethod, store, ward])
            .then(([deliveryMethod, store, ward])=> {
                const idDistrictStore = store.idAddress.idWard.idDistrict._id;
                const idDistrictReciever = ward.idDistrict._id;
                //Fee no Commission
                if (idDistrictReciever === idDistrictStore){
                    fee = Number(deliveryMethod.innerDistrictFee);
                    if (formData.totalWeight > 3){
                        surCharge = deliveryMethod.surCharge * (Number(formData.totalWeight) - 3) / 0.5;
                    }
                }else{
                    fee = Number(deliveryMethod.outerDistrictFee);
                    if (formData.totalWeight > 3){
                        surCharge = deliveryMethod.surCharge * (Number(formData.totalWeight) - 3) / 0.5;
                    }
                }
                //Add Commission
                if (formData.isUseCommission){
                    console.log("Phap");
                    commission = store.idCommission.ratioCommission * fee / 100;
                }
                let totalFee = fee + surCharge - commission;
                return {
                    nameMethodDelivery: deliveryMethod.name,
                    fee: fee,
                    surCharge: surCharge,
                    commission: commission,
                    totalFee: totalFee,
                    feeChangeAddressDelivery: 0,
                    feeStorageCharges: 0,
                    feeReturn: 0,
                }
            })
            .catch(next);
}

module.exports = new OrderController();
