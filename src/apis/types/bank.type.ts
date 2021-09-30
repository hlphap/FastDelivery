import { Document } from "mongoose";

export interface IBank extends Document {
    shortName: string;
    vnName: string;
}
