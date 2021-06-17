const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema({
        idStore: {type: mongoose.Schema.Types.ObjectId, ref: "stores"},
        idStaff: {type: mongoose.Schema.Types.ObjectId, ref: "staffs"},
        orderName: {type: String, default: "No Name"},
        receiverName: {type: String, require: true},
        receiverIdAddress: {type: mongoose.Schema.Types.ObjectId, ref: "addresses"},
        receiverPhone: {type: String, require: true},
        receiverEmail: {type: String, require: true},

        orderMoney: {type: String, default: "0"},
        totalWeight: {type: String, require: true},
        note: {type: String, default: "No Note"},

        idDeliveryMethod: {type: mongoose.Schema.Types.ObjectId, ref : "deliverymethods"},
        isUseCommission : {type: Boolean, default: false},

        standardFee: {type: String, default: "0"},
        surCharge: {type: String, default: "0"},
        commission: {type: String, default: "0"},
        feeChangeAddressDelivery: {type: String, default: "0"},
        feeStorageCharges: {type: String, default: "0"},
        feeReturn: {type: String, default: "0"},
        totalFee: {type: String, default: 0},
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

module.exports = mongoose.model("orders", Order);