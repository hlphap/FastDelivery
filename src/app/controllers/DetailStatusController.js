const DetailStatus = require("../models/DetailStatus");
const Order = require("../models/Order");
class DetailStatusController{

    create (formData){
        //Created History
        const detailstatus = DetailStatus(formData);
        detailstatus
            .save()
            .then((status)=> {
                //Update Status Present
                Order.updateOne({_id: status.idOrder},{idPresentStatus: status._id})
                .save();
            })
            .catch((err) => ({
                message: err.message,
                err,
        }));
    }

    tracking(idOrder){
        return DetailStatus.find({idOrder: idOrder})
            .populate("idStatus")
            .sort({ _id : -1})
            .then((detailstatuses) => {
                return detailstatuses.map((status)=>{
                    return status;
                })
            })
    }
}

module.exports = new DetailStatusController();