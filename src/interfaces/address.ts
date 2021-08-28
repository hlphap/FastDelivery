import { Document } from "mongoose";
import IWard from "./ward";

interface IAddress extends Document {
    ward: IWard,
    noteAddress: string,
    fullAddress: string,
}

export default IAddress;