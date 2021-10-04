import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import { IStore } from '../types';
import { AddressSchema } from './address.model';
import { BankSchema } from './bank.model';
import { CMStoreSchema } from './cmstore.model';

export const StoreSchema = new Schema<IStore>(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        accountName: {
            type: String,
            default: 'Account Name Bank',
        },
        accountNumber: {
            type: String,
            unique: true,
        },
        branchBank: {
            type: String,
            default: 'Branch Bank',
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        bank: {
            type: BankSchema,
        },
        commission: {
            type: CMStoreSchema,
        },
        address: {
            type: AddressSchema,
        },
        orders: [
            {
                type: Schema.Types.ObjectId,
                ref: 'orders',
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

StoreSchema.pre<IStore>('save', async function (next) {
    try {
        // Generate fullAddress
        this.address.fullAddress = `${this.address.noteAddress}, ${this.address.ward.name}, ${this.address.ward.district.name}`;

        // Hash password
        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Generate password hash (salt + hash)
        const passwordHashed = await bcrypt.hash(this.password, salt);

        // Re-assign the password hashed
        this.password = passwordHashed;

        next();
    } catch (err) {
        next(err);
    }
});

export const Store = model<IStore>('stores', StoreSchema);
