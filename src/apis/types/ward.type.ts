import { Document } from "mongoose";
import { IDistrict } from "./district.type";

export interface IWard extends Document {
    name: string;
    district: IDistrict;
}
