import { Document } from "mongoose";
import { Role } from ".";

export interface ITypeStaff extends Document {
    name: string;
    note: string;
    role: Role;
}
