import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import { IStaff } from "../../interfaces";

import { TypeStaffSchema } from "./type-staff";
import { CommissionStaffSchema } from "./cmstaff";
import { AddressSchema } from "./address";

const Schema = mongoose.Schema;

const StaffSchema = new Schema<IStaff>({
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
    },
    work: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
    }],
},{
    timestamps: true,
    versionKey: false,
})

//Pre call save() staff
StaffSchema.pre<IStaff>("save", { document: true, query: false }, async function (next) {
    try {
        //Generate fullAddress
        this.address.fullAddress = `${this.address.noteAddress}, ${this.address.ward.name}, ${this.address.ward.district.name}`;

        //Hash password
        //Generate a salt
        const salt = await bcrypt.genSalt(10);

        //Generate password hash (salt + hash)
        const passwordHashed = await bcrypt.hash(this.password, salt);

        //Re-assign the password hashed
        this.password = passwordHashed;

        next();
    }
    catch(err){
        next(err);
    }
})

StaffSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error)
    }
}

const Staff = mongoose.model<IStaff>("staffs", StaffSchema);

export {
    StaffSchema,
    Staff,
}