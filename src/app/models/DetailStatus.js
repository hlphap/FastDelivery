const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DetailStatus = new Schema({
    idOrder: {type: mongoose.Schema.Types.ObjectId, ref: "orders"},
    idStatus: {type: mongoose.Schema.Types.ObjectId, ref: "statuses", default: "60c6e2537a76938e1d1d6b3f"
    },
    idStaff: {type: mongoose.Schema.Types.ObjectId, ref:"staffs"}
},{
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model("detailstatuses", DetailStatus);
