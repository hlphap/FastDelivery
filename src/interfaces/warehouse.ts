import { Document } from "mongoose";
import IAddress from "./address";

interface IWareHouse extends Document{
    name: string,
    address: IAddress,
}

export default IWareHouse;
