import mongoose,{ Document } from "mongoose";
import ITypeStaff from "./type-staff";
import ICommission from "./cmstore";
import IAddress from "./address";

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
    commission: ICommission,
    address:  IAddress,
}

export default IStaff;