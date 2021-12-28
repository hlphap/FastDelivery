import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IStaff } from '../types';

import { TypeStaffSchema } from './typestaff.model';
import { CMStaffSchema } from './cmstaff.model';
import { AddressSchema } from './address.model';

export const StaffSchema = new Schema<IStaff>(
    {
        fullName: {
            type: String,
            require: true,
        },
        gender: {
            type: String,
            default: 'Male',
        },
        dateOfBirth: {
            type: String,
            default: '01/01/2000',
        },
        idNumber: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        basicSalary: {
            type: Number,
            default: 0,
        },
        actualSalary: {
            type: Number,
            default: 0,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        typeStaff: {
            type: TypeStaffSchema,
        },
        commission: {
            type: CMStaffSchema,
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

// Pre call save() staff
StaffSchema.pre<IStaff>('save', { document: true, query: false }, async function (next) {
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

StaffSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compareSync(password, this.password);
};

export const Staff = model<IStaff>('staffs', StaffSchema);
