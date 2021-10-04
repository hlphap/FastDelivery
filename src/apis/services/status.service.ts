import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../utils/custom-error';
import { Status } from '../models';
import { IStatus } from '../types';

export const getStatus = async function (): Promise<Array<IStatus>> {
    return Status.find({}).populate('afterStatus');
};

export const getNextStatus = async function (statusPresentID: string): Promise<IStatus> {
    const foundStatusPresent = await Status.findById(statusPresentID).populate('afterStatus');
    if (!foundStatusPresent) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Status not found');
    }
    return foundStatusPresent.afterStatus as IStatus;
};
