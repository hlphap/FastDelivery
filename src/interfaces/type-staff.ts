import mongoose, { Document } from "mongoose";

interface ITypeStaff extends Document {
    name: string,
    note: string,
}

export default ITypeStaff;