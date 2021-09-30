import { Document, Schema } from "mongoose";
import { IAddress } from "./address.type";
import { ICMStaff } from "./cmstaff.type";
import { IOrder } from "./order.type";
import { ITypeStaff } from "./type-staff.type";

export interface IStaff extends Document {
    fullName: any;
    gender: string;
    dateOfBirth: string;
    idNumber: string;
    phone: string;
    basicSalary: number;
    actualSalary: number;
    email: string;
    password: string;
    typeStaff: ITypeStaff;
    commission: ICMStaff;
    address: IAddress;

    orders: Array<Schema.Types.ObjectId> | Array<IOrder>;
}
