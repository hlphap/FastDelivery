import { Document, Schema } from "mongoose";
import { IAddress } from "./address.type";
import { IStore } from "./store.type";
import { IDVMethod } from "./dvmethod.type";
import { IStaff } from "./staff.type";
import { IStatus } from "./status.type";

export interface IFee extends Document {
    standard: number;
    surCharge: number;
    commission: number;
    changeAddressDelivery: number;
    storageCharge: number;
    return: number;
    total: number;
}

export interface IDetailStatus extends Document {
    status: IStatus;
    chargeStaffID?: Schema.Types.ObjectId | IStaff;
}

export interface IOrder extends Document {
    ownerStoreID: Schema.Types.ObjectId | IStore;

    // Information order
    orderName: string;
    orderMoney: number;
    weight: number;
    note: string;

    // Information receiver
    receiverName: string;
    receiverPhone: string;
    receiverEmail: string;
    receiverAddress: IAddress;

    // Promotion & method delivery
    useDVMethod: IDVMethod;
    useCommission: boolean;

    // Fee
    fee: IFee;

    // Status
    tracking: Array<IDetailStatus>;

    createdAt: Date;
    updatedAt: Date;
}
