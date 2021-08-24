import { Document } from "mongoose";

interface IDVMethod extends Document {
    name: string,
    innerDistrictFee: string,
    outerDistrictFee: string,
    surChargeInner: string,
    surChargeOuter: string,
    feeChangeAddressDelivery: string,
    feeStorageCharges: string,
    feeReturn: string,
}

export default IDVMethod;