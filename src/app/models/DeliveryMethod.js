const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeliveryMethod = new Schema({
    name: {type: String},
    innerDistrictFee: {type: String},
    outerDistrictFee: {type: String},
    surCharge: {type: String},
    feeChangeAddressDelivery: {type: String},
    feeStorageCharges: {type: String},
    feeReturn: {type: String},
},{
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model("deliverymethods", DeliveryMethod);
