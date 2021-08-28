import mongoose from "mongoose";
import { ICMStore } from "../../interfaces";

const Schema = mongoose.Schema;

const CommissionStoreSchema = new Schema({
    name: {
        type: String,
        required: true,
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
    image: {
        type: String,
        default: "None",
    },
    note: {
        type: String,
        default: "Note Commission Store"
    }
},
{
    timestamps: false,
    versionKey: false,
})

const CMStore = mongoose.model<ICMStore>("cmstores", CommissionStoreSchema);

export {
    CommissionStoreSchema,
    CMStore,
}
