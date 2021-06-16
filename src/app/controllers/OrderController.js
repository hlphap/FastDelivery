const Order = require("../models/Order");
const Store = require("../models/Store");
const Address = require("../models/Address");
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
        //Get Store
        const store = await Store.findOne({_id: req.query.idStore})
            .then((store)=> store)
            .catch(next);
    }
}

module.exports = new OrderController();
