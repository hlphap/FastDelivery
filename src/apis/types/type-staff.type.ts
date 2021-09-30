import { Document } from "mongoose";

export interface ITypeStaff extends Document {
    name: string;
    note: string;
    level: number;
}
