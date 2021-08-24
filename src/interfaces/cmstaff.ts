import { Document } from "mongoose";

interface ICMStaff extends Document {
    name: {
        type: String,
        require: true,
        default: "Commission Staff Default"
    },
    orderPerMonthMin: {
        type: Number,
        default: 0
    },
    orderPerMonthMax: {
        type: Number,
        default: 0,
    },
    ratioCommission: {
        type: Number,
        default: 3,
    },
    note: {
        type: String,
        default: "Note Commission Store"
    }
}

export default ICMStaff;