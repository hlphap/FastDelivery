const DeliveryMethod = require("../models/DeliveryMethod");

class DVMethodController{
    //[GET] /dvmethods
    index(req, res, next){
        DeliveryMethod.find({})
            .then(deliveryMethods => res.status(200).json(deliveryMethods))
            .catch(next);
    }

    //[GET] /dvmethods/:id
    show(req, res, next){
        DeliveryMethod.find({_id: req.params.id})
            .then(deliveryMethod => res.status(200).json(deliveryMethod))
            .catch(next);
    }

    //[POST] /dvmethods
    create(req, res, next){
        const formData = req.body;
        console.log(formData);
    }

}

module.exports = new DVMethodController();