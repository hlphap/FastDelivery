import { Schema, model } from "mongoose";

import { IOrder, IFee } from "../types";
import { AddressSchema } from "./address.model";
import { StatusSchema } from "./status.model";
import { DVMethodSchema, DVMethod } from "./dvmethod.model";

export const FeeSchema = new Schema<IFee>(
    {
        standard: {
            type: Number,
            default: 0,
        },
        surCharge: {
            type: Number,
            default: 0,
        },
        commission: {
            type: Number,
            default: 0,
        },
        changeAddressDelivery: {
            type: Number,
            default: 0,
        },
        storageCharge: {
            type: Number,
            default: 0,
        },
        return: {
            type: Number,
            default: 0,
        },
        total: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: false,
        versionKey: false,
    },
);

export const OrderSchema = new Schema<IOrder>(
    {
        ownerStoreID: {
            type: Schema.Types.ObjectId,
            ref: "stores",
        },
        orderName: {
            type: String,
            required: true,
        },
        orderMoney: {
            type: Number,
            default: 0,
        },
        weight: {
            type: Number,
            required: true,
        },
        note: {
            type: String,
            default: "Not Note",
        },
        receiverName: {
            type: String,
            required: true,
        },
        receiverPhone: {
            type: String,
            required: true,
        },
        receiverEmail: {
            type: String,
            required: true,
        },
        receiverAddress: {
            type: AddressSchema,
            required: true,
        },
        useDVMethod: {
            type: DVMethodSchema,
            required: true,
        },
        useCommission: {
            type: Boolean,
            default: false,
        },
        fee: {
            type: FeeSchema,
        },
        tracking: {
            type: [
                {
                    status: StatusSchema,
                    chargeStaffID: Schema.Types.ObjectId,
                },
            ],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

OrderSchema.pre<IOrder>("save", async function (next) {
    try {
        // Fill fullAddress
        this.receiverAddress.fullAddress = `${this.receiverAddress.noteAddress}, ${this.receiverAddress.ward.name}, ${this.receiverAddress.ward.district.name}`;

        // Confirm DVMethod
        const dvMethodID = this.useDVMethod.id;
        const method = await DVMethod.findOne({ _id: dvMethodID });
        this.useDVMethod = method!;

        // Fee
        // this.fee = await ChargeShipping(this, {
        //     changeAddress: true,
        // });
    } catch (err) {
        next(err);
    }
});

export const Order = model<IOrder>("orders", OrderSchema);
