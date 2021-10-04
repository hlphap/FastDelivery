import { Schema, model } from 'mongoose';

import { IWarehouse } from '../types';
import { AddressSchema } from './address.model';

export const WarehouseSchema = new Schema<IWarehouse>(
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

WarehouseSchema.pre<IWarehouse>('save', async function (next) {
    try {
        // Generate fullAddress
        this.address.fullAddress = `${this.address.noteAddress}, ${this.address.ward.name}, ${this.address.ward.district.name}`;
        next();
    } catch (err) {
        next(err);
    }
});

export const Warehouse = model<IWarehouse>('Warehouses', WarehouseSchema);
