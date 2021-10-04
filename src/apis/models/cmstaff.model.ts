import { Schema, model } from 'mongoose';
import { ICMStaff } from '../types';

export const CMStaffSchema = new Schema<ICMStaff>(
    {
        name: {
            type: String,
            required: true,
        },
        orderPerMonthMin: {
            type: Number,
            default: 0,
        },
        orderPerMonthMax: {
            type: Number,
            default: 0,
        },
        ratioCommission: {
            type: Number,
            default: 3,
        },
        image: {
            type: String,
            default: 'None',
        },
        note: {
            type: String,
            default: 'Note Commission Staff',
        },
    },
    {
        timestamps: false,
        versionKey: false,
    },
);

export const CMStaff = model<ICMStaff>('cmstaffs', CMStaffSchema);
