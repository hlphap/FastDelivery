import mongoose,{ Document } from "mongoose";
import ITypeStaff from "./type-staff";
import ICommission from "./cmstore";
import IAddress from "./address";
import { IOrder } from ".";

interface IStaff extends Document {
    [x: string]: any;
    fullName: string,
    gender: string,
    dateOfBirth: string,
    idNumber: string,
    phone: string,
    basicSalary: number,
    actualSalary: number,
    email: string,
    password: string,
    typeStaff: ITypeStaff,
    commission: ICommission,
    address:  IAddress,

    orders: Array<mongoose.Schema.Types.ObjectId> | Array<IOrder>,
}

export default IStaff;