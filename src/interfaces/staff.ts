import mongoose,{ Document } from "mongoose";
import ITypeStaff from "./type-staff";

interface IStaff extends Document {
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
    idCommission:  mongoose.Schema.Types.ObjectId,
    idAddress:  mongoose.Schema.Types.ObjectId,
}

export default IStaff;