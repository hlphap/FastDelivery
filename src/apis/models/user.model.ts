import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

import { IUser, Role, UserModel } from '../types';

const { Schema } = mongoose;

const UserSchema = new Schema<IUser, UserModel>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value: string) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
            validate(value: String) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number');
                }
            },
            private: true,
        },
        displayName: {
            type: String,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            default: 'STANDARD' as Role,
        },
    },
    {
        timestamps: true,
    },
);

UserSchema.statics.isEmailTaken = async function (email, excludeUserID) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserID } });
    return !!user;
};

UserSchema.methods.checkPasswordMatch = function (password: string) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

const User = mongoose.model<IUser, UserModel>('users', UserSchema);

export { UserSchema, User };
