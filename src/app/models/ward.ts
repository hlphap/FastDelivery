import mongoose from "mongoose";
import { IWard } from "../../interfaces";
import { DistrictSchema } from "./district"

const Schema = mongoose.Schema;

const WardSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    district: {
        type: DistrictSchema,
        required: true,
    }
},{
    timestamps: false,
    versionKey: false,
})

const Ward = mongoose.model<IWard>("wards", WardSchema);

export {
    WardSchema,
    Ward
}