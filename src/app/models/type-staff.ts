import mongoose from "mongoose";
import { ITypeStaff } from "../../interfaces";

const Schema = mongoose.Schema;

const TypeStaffSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        default: 0,
    }
},{
    timestamps: true,
    versionKey: false,
})

const TypeStaff = mongoose.model<ITypeStaff>("typestaffs", TypeStaffSchema);

export {
    TypeStaffSchema,
    TypeStaff,
}
