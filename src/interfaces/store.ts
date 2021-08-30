import { Document } from "mongoose";
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
}

export default IStore;
