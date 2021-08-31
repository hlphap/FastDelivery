import mongoose from "mongoose";
import { IStatus } from "../../interfaces";

const Schema = mongoose.Schema;

const StatusSchema = new Schema<IStatus>({
    name: {
        type: String,
    },
    note: {
        type: String,
    },
    beforeStatus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "status",
    }],
    afterStatus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "status",
    }]
},{
    versionKey: false,
    timestamps: false,
})

const Status = mongoose.model<IStatus>("status", StatusSchema);

export {
    Status,
    StatusSchema,
}
