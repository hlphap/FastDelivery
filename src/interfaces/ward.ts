import mongoose, { Document } from "mongoose";
import IDistrict from "./district"

interface IWard extends Document {
    name: string,
    district: IDistrict,
}

export default IWard;