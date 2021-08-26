import mongoose,{ Document } from "mongoose";

interface IStaff extends Document {
    fullName: string,
    gender: string,
    dateOfBirth: string,
    idNumber: string,
    phone: string,
    basicSalary: string,
    actualSalary: string,
    email: string,
    password: string,
    idTypeStaff: mongoose.Schema.Types.ObjectId,
    idCommission:  mongoose.Schema.Types.ObjectId,
    idAddress:  mongoose.Schema.Types.ObjectId,
}

export default IStaff;