const Order = require("../models/Order");
const Address = require("../models/Address");
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
}

module.exports = new OrderController();
