import mongoose from "mongoose";
import { IDVMethod } from "../../interfaces";

const Schema = mongoose.Schema;

const DeliveryMethod = new Schema({
    name: {
        type: String,
        required: true,
    },
    innerDistrictFee: {
        type: Number,
        default: 10000,
    },
    outerDistrictFee: {
        type: Number,
        default: 10000,
    },
    surChargeInner: {
        type: Number,
        default: 10000,
    },
    surChargeOuter: {
        type: Number,
        default: 10000,
    },
    feeChangeAddressDelivery: {
        type: Number,
        default: 10000,
    },
    feeStorageCharges: {
        type: Number,
        default: 10000,
    },
    feeReturn: {
        type: Number,
        default: 10000,
    },
},{
    timestamps: true,
    versionKey: false,
})

export default mongoose.model<IDVMethod>("dvmethods", DeliveryMethod);