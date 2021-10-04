import { Schema, model } from "mongoose";

import { IAddress } from "../types";
import { WardSchema } from "./ward.model";

export const AddressSchema = new Schema<IAddress>({
    fullAddress: {
        type: String,
    },
    noteAddress: {
        type: String,
    },
    ward: {
        type: WardSchema,
        required: true,
    },
});

export const Address = model<IAddress>("addresses", AddressSchema);
