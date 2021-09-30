import { Document } from "mongoose";

export interface ICMStaff extends Document {
    name: string;
    orderPerMonthMin: number;
    orderPerMonthMax: number;
    ratioCommission: number;
    image: string;
    note: string;
}
