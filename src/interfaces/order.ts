import mongoose, { Document } from "mongoose";
import IAddress from "./address";
import IDVMethod from "./dvmethod";
import IStatus from "./status";

interface IFee extends Document {
    standard: number;
    surCharge: number;
    commission: number;
    changeAddressDelivery: number;
    storageCharge: number;
    return: number;
    total: number;
}

interface IOrder extends Document {
    ownerStoreID: mongoose.Schema.Types.ObjectId;

    //Information order
    orderName: string;
    orderMoney: number;
    weight: number;
    note: string;

    //Information receiver
    receiverName: string;
    receiverPhone: string;
    receiverEmail: string;
    receiverAddress: IAddress;

    //Promotion & method delivery
    useDVMethod: IDVMethod;
    useCommission: boolean;

    //Fee
    fee: IFee;

    //Status
    tracking: {
        status: IStatus,
        chargeStaffID: mongoose.Schema.Types.ObjectId;
    }[];
}

export {
    IOrder,
    IFee,
};
