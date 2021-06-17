const DetailStatus = require("../models/DetailStatus");

class DetailStatusController{
    create (formData){
        const detailstatus =  DetailStatus(formData);
        detailstatus
            .save()
            .then((status)=> status)
            .catch((err) => ({
                message: err.message,
                err,
        }));
    }
}

module.exports = new DetailStatusController();