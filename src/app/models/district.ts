import mongoose from "mongoose";
import { IDistrict } from "../../interfaces";

const Schema = mongoose.Schema;

const DistrictSchema = new Schema({
    name: {
        type: String,
        require: true,
    }
},{
    timestamps: false,
    versionKey: false,
})

const District = mongoose.model<IDistrict>("districts", DistrictSchema);

export {
    DistrictSchema,
    District
}