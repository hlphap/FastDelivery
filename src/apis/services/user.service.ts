import httpStatus from 'http-status-codes';

import { CustomError } from '../../utils/custom-error';
import { User } from '../models';
import { IUser } from '../types';

const createUser = async (userBody: IUser): Promise<IUser> => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new CustomError(httpStatus.BAD_REQUEST, 'mongoose', 'Email already taken');
    }
    return User.create(userBody);
};

const getUsers = async (): Promise<Array<IUser>> =>
    User.find({}).select(['-password', '-createdAt', '-updatedAt', '-__v']);

const updateUser = async (userID: string, user: IUser) => {
    const foundUser = await User.findById(userID);
    if (!foundUser) throw new CustomError(httpStatus.NOT_FOUND, 'mongoose', 'User not found');
    return User.findByIdAndUpdate(userID, user, {
        new: true,
    });
};

const deleteUser = async (userID: string) => {
    const foundUser = await User.findById(userID);
    if (!foundUser) throw new CustomError(httpStatus.NOT_FOUND, 'mongoose', 'User not found');
    return User.findByIdAndDelete(userID);
};

export { getUsers, createUser, updateUser, deleteUser };
