import { Document, Schema } from "mongoose";
import { IBank } from "./bank.type";
import { ICMStore } from "./cmstore.type";
import { IAddress } from "./address.type";
import { IOrder } from "./order.type";

export interface IStore extends Document {
    name: string;
    phone: string;
    accountName: string;
    accountNumber: string;
    branchBank: string;
    email: string;
    password: string;
    bank: IBank;
    commission: ICMStore;
    address: IAddress;
    orders: Array<IOrder> | Array<Schema.Types.ObjectId>;
}
