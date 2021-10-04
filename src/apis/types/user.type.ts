import { Model, Document } from 'mongoose';

export type Role = 'ADMINISTRATOR' | 'STANDARD';

export interface IUser extends Document {
    email: string;
    password: string;
    displayName: string;
    role: Role;

    checkPasswordMatch(password: string): boolean;
}

export interface UserModel extends Model<IUser> {
    isEmailTaken(email: string): boolean;
}
