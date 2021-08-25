import { Document } from "mongoose";

interface IDVMethod extends Document {
    name: String,
    innerDistrictFee: Number,
    outerDistrictFee: Number,
    surChargeInner: Number,
    surChargeOuter: Number,
    feeChangeAddressDelivery: Number,
    feeStorageCharges: Number,
    feeReturn: Number,
}

export default IDVMethod;