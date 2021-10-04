import { Schema, model } from 'mongoose';

import { IWareHouse } from '../types';
import { AddressSchema } from './address.model';

export const WareHouseSchema = new Schema<IWareHouse>(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: AddressSchema,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

WareHouseSchema.pre<IWareHouse>('save', async function (next) {
    try {
        // Generate fullAddress
        this.address.fullAddress = `${this.address.noteAddress}, ${this.address.ward.name}, ${this.address.ward.district.name}`;
        next();
    } catch (err) {
        next(err);
    }
});

export const WareHouse = model<IWareHouse>('warehouses', WareHouseSchema);
