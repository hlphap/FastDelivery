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
        const dvmethod = new DeliveryMethod(formData);
        dvmethod
            .save()
            .then(()=> res.status(200).json({
                status: 200,
                message: "Create Delivery Method Successfully",
            }))
            .catch(next);
    }

    //[PUT] /dvmethods/:id
    update(req,res, next){
        const formData = req.body;
        DeliveryMethod.updateOne({_id: req.params.id}, formData)
            .then(()=> res.status(200).json({
                status: 200,
                message: "Update Delivery Method Successfully"
            }))
            .catch(next);
    }

    //[DELETE] /dvmethods/:id
    delete(req, res, next){
        DeliveryMethod.deleteOne({_id: req.params.id})
            .then(()=>res.status(200).json({
                status: 200,
                message: "Delete Delivery Method Successfully",
            }))
            .catch(next);
    }
}

module.exports = new DVMethodController();