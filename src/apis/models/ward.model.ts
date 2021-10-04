import { Schema, model } from "mongoose";

import { IWard } from "../types";
import { DistrictSchema } from "./district.model";

export const WardSchema = new Schema<IWard>(
    {
        name: {
            type: String,
            required: true,
        },
        district: {
            type: DistrictSchema,
            required: true,
        },
    },
    {
        timestamps: false,
        versionKey: false,
    },
);

export const Ward = model<IWard>("wards", WardSchema);
