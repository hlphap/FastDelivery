import { Schema, model } from 'mongoose';

import { ITypeStaff } from '../types';

export const TypeStaffSchema = new Schema<ITypeStaff>(
    {
        name: {
            type: String,
            required: true,
        },
        note: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const TypeStaff = model<ITypeStaff>('typestaffs', TypeStaffSchema);
