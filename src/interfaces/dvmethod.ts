import { Document } from "mongoose";

interface IDVMethod extends Document {
    name: string,
    innerDistrictFee: number,
    outerDistrictFee: number,
    surChargeInner: number,
    surChargeOuter: number,
    feeChangeAddressDelivery: number,
    feeStorageCharges: number,
    feeReturn: number,
}

export default IDVMethod;