import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catch-async';
import { dvMethodService } from '../services';

export const getDVMethods = catchAsync(async (req: Request, res: Response) => {
    const dvMethods = await dvMethodService.getDVMethods();
    return res.status(httpStatus.OK).send({ dvMethods });
});

export const createDVMethod = catchAsync(async (req: Request, res: Response) => {
    const newDVMethod = await dvMethodService.createDVMethod(req.body);
    return res.status(httpStatus.CREATED).send({ newDVMethod });
});

export const updateDVMethod = catchAsync(async (req: Request, res: Response) => {
    const updatedDVMethod = await dvMethodService.updateDVMethod(req.params.dvMethodID, req.body);
    return res.status(httpStatus.OK).send({ updatedDVMethod });
});

export const deleteDVMethod = catchAsync(async (req: Request, res: Response) => {
    const deletedDVMethod = await dvMethodService.deleteDVMethod(req.params.dvMethodID);
    return res.status(httpStatus.OK).send({ deletedDVMethod });
});
