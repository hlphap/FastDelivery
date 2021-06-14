const CommissionStore = require("../models/CommissionStore");

class CMStoreController{
    //[GET] cmstores/
    index(req,res,next){
        CommissionStore.find({})
            .then(stores => res.status(200).json(stores))
            .catch(next);
    }

    //[POST] cmstores/
    create(req,res,next){
        const formData = req.body;
        const commissionStore = new CommissionStore(formData);
        commissionStore
            .save()
            .then(()=> res.status(200).json({
                status: 200,
                message: "Create Commission Store Success",
            }))
            .catch(next);
    }

    //[PUT] cmstores/:id
    update(req, res, next){
        const formData = req.body;
        CommissionStore.updateOne({_id: req.params.id},formData)
            .then(()=> res.status(200).json({
                status: 200,
                message: "Update Commission Store Success",
            }))
            .catch(next);
    }

    //[DELETE] cmstores/:id
    delete(req,res,next){
        CommissionStore.deleteOne({_id: req.params.id})
            .then(()=> res.status(200).json({
                status: 200,
                message: "Delete Commission Store Success",
            }))
            .catch(next);
    }

}

module.exports = new CMStoreController();