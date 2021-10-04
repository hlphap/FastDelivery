import { Schema, model } from "mongoose";
import { ICMStore } from "../types";

export const CMStoreSchema = new Schema<ICMStore>(
    {
        name: {
            type: String,
            required: true,
        },
        orderPerMonthMin: {
            type: Number,
            default: 0,
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
            default: "Note Commission Store",
        },
    },
    {
        timestamps: false,
        versionKey: false,
    },
);

export const CMStore = model<ICMStore>("cmstores", CMStoreSchema);
