import mongoose from "mongoose";
import { IStaff } from "../../interfaces";

const Schema = mongoose.Schema;

const Staff = new Schema({
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
        type: String,
        default: "0",
    },
    actualSalary: {
        type: String,
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
    idTypeStaff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "typestaffs",
        required: true,
    },
    idCommission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "commissionstaffs",
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

export default mongoose.model<IStaff>("staffs", Staff);