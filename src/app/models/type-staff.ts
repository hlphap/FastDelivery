import mongoose from "mongoose";
import { ITypeStaff } from "../../interfaces";

const Schema = mongoose.Schema;

const TypeStaff = new Schema({
    name: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
    versionKey: false,
})

export default mongoose.model<ITypeStaff>("typestaffs", TypeStaff);