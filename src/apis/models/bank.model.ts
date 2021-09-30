import { Schema, model } from "mongoose";

import { IBank } from "apis/types";

export const BankSchema = new Schema<IBank>(
    {
        shortName: {
            type: String,
            required: true,
        },
        vnName: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Bank = model<IBank>("banks", BankSchema);
