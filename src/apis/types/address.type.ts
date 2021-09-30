import { Document } from "mongoose";
import { IWard } from "./ward.type";

export interface IAddress extends Document {
    ward: IWard;
    noteAddress: string;
    fullAddress: string;
}
