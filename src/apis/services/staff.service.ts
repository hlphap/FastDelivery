import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../utils/custom-error';
import { Staff } from '../models';
import { IOrder, IStaff } from '../types';

export const getStaffs = async function (): Promise<Array<IStaff>> {
    return Staff.find({});
};

export const getStaff = async function (staffID: string): Promise<IStaff> {
    const foundStaff = await Staff.findById(staffID);
    if (!foundStaff) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Staff not found');
    }
    return foundStaff;
};

export const createStaff = async function (staff: IStaff): Promise<IStaff> {
    return Staff.create(staff);
};

export const updateStaff = async function (staffID: string, staff: IStaff): Promise<IStaff> {
    const foundStaff = await Staff.findById(staffID);
    if (!foundStaff) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Staff not found');
    }
    return Staff.findByIdAndUpdate(staffID, staff, {
        new: true,
    });
};

export const deleteStaff = async function (staffID: string): Promise<IStaff> {
    const foundStaff = await Staff.findById(staffID);
    if (!foundStaff) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Staff not found');
    }
    return Staff.findByIdAndDelete(staffID);
};

export const getOrdersFromStaff = async function (staffID: string): Promise<Array<IOrder>> {
    const foundStaff = await Staff.findById(staffID).populate('orders');
    return <Array<IOrder>>foundStaff.orders;
};
