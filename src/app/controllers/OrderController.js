const Order = require("../models/Order");
const Store = require("../models/Store");
const Ward = require("../models/Ward");
const DeliveryMethod = require("../models/DeliveryMethod");
const Status = require("../models/Status");
const DetailStatus = require("../models/DetailStatus");

const addressController = require("./AddressController");
const storeController = require("./StoreController");
const detailStatusController = require("./DetailStatusController");
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
         //1 Call Function Fee
        const fee = await ChangeFee(formData,false, next);

        //2 Create receiverIdAddress to Addresses
        const formReceiverAddress = JSON.parse(formData.receiverIdAddress);
        formData.receiverIdAddress = await addressController.create(formReceiverAddress);

        //3. Create Order
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

        //4 Create Detail Status
        detailStatusController.create({idOrder: order.id});
    }

    //[PUT] //orders/:id/assignment
    assignmentOrderToStaff(req, res, next){
        const formData = req.body;
        const formDetailStatus = formData;
        formDetailStatus.idStatus = "60c6e2d5c6b3d644d416ed57";
        formDetailStatus.idOrder = req.params.id;

        detailStatusController.create(formDetailStatus);
        //formDetailStatus : idStaff

        //Update Order
        formData.isHandling = true;
        Order.updateOne({_id: req.params.id}, formData)
            .then(()=> res.status(200).json({
                status: 200,
                message: "Assignment To Staff Success",
            }))
            .catch(next);
    }

    //[PUT] //orders/:id
    async update(req,res,next){
        //Update Address
        const formData = req.body;
        const formAddress = JSON.parse(formData.receiverIdAddress);

        //Check Ward Changed
        const isWardChanged = await Order.findOne({_id: req.params.id})
            .populate("receiverIdAddress")
            .then(order=>{
                if (order.idWard == formAddress.idWard)
                    return false;
                else
                    return true;
            })

        console.log(formAddress);
         //Config Fee
        await ChangeFee(formData,isWardChanged, next);

        //Update Address
        const updateAddress = addressController.update(formAddress._id,formAddress);

        delete formData.receiverIdAddress;

        //Update Information
        const updateOrder = new Promise((resolve, reject) => {
        Order.updateOne({ _id: req.params.id }, formData)
            .then(() => resolve())
            .catch(() => reject());
        });

        Promise.all([updateAddress, updateOrder])
        .then((result) => {
            res.status(200).json({ status: 200, message: "Update success" });
        })
        .catch(next);
    }

    //[GET] /orders/handling
    handling(req, res, next){
        Order.find({isHandling: false})
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
             .populate("idStaff")
             .then(orders => res.status(200).json(orders))
            .catch(next);
    }

    //[GET] /orders/:id/tracking
    tracking(req, res, next){
        const detailStatuses = detailStatusController.tracking(req.params.id);
        detailStatuses
            .then((detailStatuses)=>res.status(200).json(detailStatuses));
    }

    //[GET] /orders/:id/statusesNext
    statusesNext(req, res, next){
        const promise = Order.findById({_id : req.params.id})
            .populate({
                path: "idPresentStatus",
                populate: "idStatus",
            })
            .then(statuses=> statuses.idPresentStatus)
            .then(presentStatus=>{
                let resultNextStatus = [];
                let a;
                switch(presentStatus.idStatus.nameEnglish){
                    case "NoProcess":{
                        a = Status.find({nameEnglish: "Processed"})
                            .then((status)=>{
                                statuses.forEach(status=>{
                                    resultNextStatus.push(status)
                                })
                            });
                        break;
                    }
                    case "Processed":{
                       a =  Status.find({nameEnglish: "OrderedFromTheStore"})
                            .then((statuses)=>{
                                statuses.forEach(status=>{
                                    resultNextStatus.push(status)
                                })
                            });
                        break;
                    }
                    case "OrderedFromTheStore":{
                       a =  Status.find({ $or: [
                                {nameEnglish: "OrderDeliveredSuccessfully"},
                                {nameEnglish: "DeliveryFailed"}
                            ]})
                            .then((statuses)=>{
                                statuses.forEach(status=>{
                                    resultNextStatus.push(status)
                                })
                            });
                        break;
                    }
                }
               a.then(()=>res.json(resultNextStatus));
            })
            .catch(next);
    }

    //[PUT] /orders/:id/updateStatus
    updateStatus(req, res, next){
        const formData = req.body;
        formData.idOrder = req.params.id;
        detailStatusController.create(formData);
        res.status(200).json({
            status: "200",
            message: "Update status success",
        })
    }
}

//All Fee Delivery
function Fee(formData, isChangedAddress, next){
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
                    commission = store.idCommission.ratioCommission * standardFee / 100;
                }

                //Add Fee Changed Address
                if (isChangedAddress)
                    feeChangeAddressDelivery = Number(deliveryMethod.feeChangeAddressDelivery);

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

//Create Fee For Order
async function ChangeFee(formData, isChangedAddress, next){
    const fee = await Fee(formData, isChangedAddress, next);
    formData.standardFee = fee.standardFee;
    formData.surCharge = fee.surCharge;
    formData.commission = fee.commission;
    formData.feeChangeAddressDelivery = fee.feeChangeAddressDelivery;
    formData.feeStorageCharges = fee.feeStorageCharges;
    formData.feeReturn = fee.feeReturn;
    formData.totalFee = fee.totalFee;
}
module.exports = new OrderController();
