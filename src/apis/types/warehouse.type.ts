import { Document } from "mongoose";
import { IAddress } from "./address.type";

export interface IWareHouse extends Document {
    name: string;
    address: IAddress;
}
