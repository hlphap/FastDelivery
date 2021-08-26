import mongoose from "mongoose";
import { ICMStaff } from "../../interfaces";

const Schema = mongoose.Schema;

const CommissionStaffSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    orderPerMonthMin: {
        type: Number,
        default: 0
    },
    orderPerMonthMax: {
        type: Number,
        default: 0,
    },
    ratioCommission: {
        type: Number,
        default: 3,
    },
    image: {
        type: String,
        default: "None",
    },
    note: {
        type: String,
        default: "Note Commission Staff"
    }
},
{
    timestamps: true,
    versionKey: false,
})

const CMStaff = mongoose.model<ICMStaff>("cmstaffs", CommissionStaffSchema);

export {
    CommissionStaffSchema,
    CMStaff,
}