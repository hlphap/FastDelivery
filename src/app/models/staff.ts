import mongoose from "mongoose";
import { IStaff } from "../../interfaces";

import { TypeStaffSchema } from "./type-staff";
import { CommissionStaffSchema } from "./cmstaff";
import { AddressSchema } from "./address";

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
    },
    commission: {
        type: CommissionStaffSchema,
    },
    address: {
       type: AddressSchema,
    }
},{
    timestamps: true,
    versionKey: false,
})

//Pre call save() staff
StaffSchema.pre<IStaff>("save", { document: true, query: false }, async function (next) {
    try {
        this.address.fullAddress = `${this.address.noteAddress}, ${this.address.ward.name}, ${this.address.ward.district.name}`;
        next();
    }
    catch(err){
        next(err);
    }
})

const Staff = mongoose.model<IStaff>("staffs", StaffSchema);

export {
    StaffSchema,
    Staff,
}