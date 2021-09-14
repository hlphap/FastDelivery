import mongoose, { Document } from "mongoose";
import { IOrder } from ".";
import IAddress from "./address";
import IBank from "./bank";
import ICMStore from "./cmstore";

interface IStore extends Document {
    name: string,
    phone: string,
    accountName: string,
    accountNumber: string,
    branchBank: string,
    email: string,
    password: string,
    bank: IBank,
    commission: ICMStore,
    address: IAddress,
    orders: Array<IOrder> | Array<mongoose.Schema.Types.ObjectId>
}

export default IStore;
