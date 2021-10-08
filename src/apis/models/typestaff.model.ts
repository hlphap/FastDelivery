import { Schema, model } from 'mongoose';

import { ITypeStaff, Role } from '../types';

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
        role: {
            type: String,
            default: 'DELIVERY' as Role,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const TypeStaff = model<ITypeStaff>('typestaffs', TypeStaffSchema);
