import mongoose from "mongoose";
import { IStaff } from "../../interfaces";

import { TypeStaffSchema } from "./type-staff";
import { CommissionStaffSchema } from "./cmstaff";

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    fullName: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        default: "Male",
    },
    dateOfBirth: {
        type: String,
        default: "01/01/2000",
    },
    idNumber: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    basicSalary: {
        type: Number,
        default: "0",
    },
    actualSalary: {
        type: Number,
        default: "0",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    typeStaff: {
        type: TypeStaffSchema,
        required: true,
    },
    commission: {
        type: CommissionStaffSchema,
        required: true,
    },
    idAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses",
        required: true,
    }
},{
    timestamps: true,
    versionKey: false,
})

const Staff = mongoose.model<IStaff>("staffs", StaffSchema);

export {
    StaffSchema,
    Staff,
}