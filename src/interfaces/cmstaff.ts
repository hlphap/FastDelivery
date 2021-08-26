import { Document } from "mongoose";

interface ICMStaff extends Document {
    name: string,
    orderPerMonthMin: number,
    orderPerMonthMax: number,
    ratioCommission: number,
    image: string,
    note: string,
}

export default ICMStaff;