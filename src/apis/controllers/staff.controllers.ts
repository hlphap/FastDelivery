import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CatchAsync from '../../utils/catch-async';
import { staffService } from '../services';

export const getStaffs = CatchAsync(async (req: Request, res: Response) => {
    const staffs = await staffService.getStaffs();
    return res.status(StatusCodes.OK).send({ staffs });
});

export const createStaff = CatchAsync(async (req: Request, res: Response) => {
    const newStaff = await staffService.createStaff(req.body);
    return res.status(StatusCodes.CREATED).send({ newStaff });
});

export const updateStaff = CatchAsync(async (req: Request, res: Response) => {
    const updatedStaff = await staffService.updateStaff(req.params.staffID, req.body);
    return res.status(StatusCodes.OK).send({ updatedStaff });
});

export const deleteStaff = CatchAsync(async (req: Request, res: Response) => {
    const deletedStaff = await staffService.deleteStaff(req.params.staffID);
    return res.status(StatusCodes.OK).send({ deletedStaff });
});

export const getOrdersFromStaff = CatchAsync(async (req: Request, res: Response) => {
    const orders = await staffService.getOrdersFromStaff(req.params.staffID);
    return res.status(StatusCodes.OK).send({ orders });
});
