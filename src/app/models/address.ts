import { NextFunction } from "express";
import mongoose from "mongoose";
import { nextTick } from "process";
import { IAddress } from "../../interfaces";
import { WardSchema } from "./ward";

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    fullAddress: {
        type: String,
    },
    noteAddress: {
        type: String,
    },
    ward: {
        type: WardSchema
    }
})

const Address = mongoose.model<IAddress>("addresses",AddressSchema);

export {
    AddressSchema,
    Address,
}
