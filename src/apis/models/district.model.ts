import { Schema, model } from "mongoose";

import { IDistrict } from "apis/types";

export const DistrictSchema = new Schema<IDistrict>(
    {
        name: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: false,
        versionKey: false,
    },
);

export const District = model<IDistrict>("districts", DistrictSchema);
