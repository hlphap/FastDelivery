import mongoose from "mongoose";
import { IBank } from "../../interfaces";

const Schema = mongoose.Schema;

const BankSchema = new Schema({
    shortName: {
        type: String,
        required: true,
    },
    vnName: {
        type: String,
    }
},{
    timestamps: true,
    versionKey: false,
})

const Bank = mongoose.model<IBank>("banks", BankSchema);

export {
    BankSchema,
    Bank,
}

