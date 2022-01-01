import { Schema, model } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import format from 'date-format';

import { IOrder, IFee } from '../types';
import { AddressSchema } from './address.model';
import { StatusSchema } from './status.model';
import { DVMethodSchema, DVMethod } from './dvmethod.model';
import { chargeShipping } from '../../middlewares';
import { CustomError } from '../../utils/custom-error';

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
            ref: 'stores',
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
            default: 'Not Note',
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
                    timeStamp: {
                        type: String,
                        default: format('dd/MM/yyyy hh:mm', new Date()),
                    },
                },
            ],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

OrderSchema.pre<IOrder>('save', async function (next) {
    try {
        this.receiverAddress.fullAddress = `${this.receiverAddress.noteAddress}, ${this.receiverAddress.ward.name}, ${this.receiverAddress.ward.district.name}`;
        // Confirm DVMethod
        const foundMethod = await DVMethod.findById(this.useDVMethod.id);
        if (!foundMethod) {
            throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'DVMethod not found when confirm delivery method');
        }
        this.useDVMethod = foundMethod;
        // Fee
        this.fee = await chargeShipping(this);
    } catch (err) {
        next(err);
    }
});

export const Order = model<IOrder>('orders', OrderSchema);
