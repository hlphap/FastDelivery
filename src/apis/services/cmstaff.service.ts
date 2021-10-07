import { StatusCodes } from 'http-status-codes';
import { ICMStaff } from '../types';
import { CMStaff } from '../models';
import { CustomError } from '../../utils/custom-error';

export const getCMStaffs = async function (): Promise<Array<ICMStaff>> {
    return CMStaff.find({});
};

export const createCMStaff = async function (cmStaff: ICMStaff): Promise<ICMStaff> {
    return CMStaff.create(cmStaff);
};

export const updateCMStaff = async function (cmStaffID: string, cmStaff: ICMStaff): Promise<ICMStaff> {
    const foundCMStaff = await CMStaff.findById(cmStaffID);
    if (!foundCMStaff) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Commission store not found');
    }
    return CMStaff.findByIdAndUpdate(cmStaffID, cmStaff, {
        new: true,
    });
};

export const deleteCMStaff = async function (cmStaffID: string): Promise<ICMStaff> {
    const foundCMStaff = await CMStaff.findById(cmStaffID);
    if (!foundCMStaff) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Commission store not found');
    }
    return CMStaff.findByIdAndDelete(cmStaffID);
};
