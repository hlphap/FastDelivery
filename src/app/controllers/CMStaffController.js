const CommissionStaff = require("../models/CommissionStaff");

class CMStaffCommission{
    //[GET] cmstaffs/
    index(req,res,next){
        CommissionStaff.find({})
            .then(commission => res.status(200).json(commission))
            .catch(next);
    }

    //[POST] cmstaffs/
    create(req,res,next){
        const formData = req.body;
        const commissionStaff = new CommissionStaff(formData);
        commissionStaff
            .save()
            .then(()=> res.status(200).json({
                status: 200,
                message: "Create Commission Staff Success",
            }))
            .catch(next);
    }

    //[PUT] cmstaffs/:id
    update(req, res, next){
        const formData = req.body;
        CommissionStaff.updateOne({_id: req.params.id},formData)
            .then(()=> res.status(200).json({
                status: 200,
                message: "Update Commission Staff Success",
            }))
            .catch(next);
    }

    //[DELETE] cmstaffs/:id
    delete(req,res,next){
        CommissionStaff.deleteOne({_id: req.params.id})
            .then(()=> res.status(200).json({
                status: 200,
                message: "Delete Commission Staff Success",
            }))
            .catch(next);
    }

}

module.exports = new CMStaffCommission();