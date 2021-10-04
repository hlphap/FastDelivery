import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catch-async';
import { cmStaffService } from '../services';

export const getCMStaffs = catchAsync(async (req: Request, res: Response) => {
    const cmStaffs = await cmStaffService.getCMStaffs();
    return res.status(StatusCodes.OK).send({ cmStaffs });
});

export const createCMStaff = catchAsync(async (req: Request, res: Response) => {
    const newCMStaff = await cmStaffService.createCMStaff(req.body);
    return res.status(StatusCodes.CREATED).send({ newCMStaff });
});

export const updateCMStaff = catchAsync(async (req: Request, res: Response) => {
    const updatedCMStaff = await cmStaffService.updateCMStaff(req.params.cmStaffID, req.body);
    return res.status(StatusCodes.OK).send({ updatedCMStaff });
});

export const deleteCMStaff = catchAsync(async (req: Request, res: Response) => {
    const deletedCMStaff = await cmStaffService.deleteCMStaff(req.params.cmStaffID);
    return res.status(StatusCodes.OK).send({ deletedCMStaff });
});
