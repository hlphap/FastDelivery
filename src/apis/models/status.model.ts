import { Schema, model } from "mongoose";

import { IStatus } from "apis/types";

export const StatusSchema = new Schema<IStatus>(
    {
        name: {
            type: String,
        },
        note: {
            type: String,
        },
        code: {
            type: String,
            unique: true,
        },
        afterStatus: [
            {
                type: Schema.Types.ObjectId,
                ref: "status",
            },
        ],
    },
    {
        versionKey: false,
        timestamps: false,
    },
);

export const Status = model<IStatus>("status", StatusSchema);
