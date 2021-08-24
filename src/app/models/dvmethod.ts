import mongoose from "mongoose";
import { IDVMethod } from "../../interfaces";

const Schema = mongoose.Schema;

const DeliveryMethod = new Schema({
    name: {
        type: String,
    },
    innerDistrictFee: {
        type: String,
    },
    outerDistrictFee: {
        type: String,
    },
    surChargeInner: {
        type: String,
    },
    surChargeOuter: {
        type: String,
    },
    feeChangeAddressDelivery: {
        type: String
    },
    feeStorageCharges: {
        type: String
    },
    feeReturn: {
        type: String
    },
},{
    timestamps: true,
    versionKey: false,
})

export default mongoose.model<IDVMethod>("dvmethods", DeliveryMethod);