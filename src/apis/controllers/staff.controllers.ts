import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CatchAsync from '../../utils/catch-async';
import { orderService, staffService, tokenService } from '../services';

export const getStaffs = CatchAsync(async (req: Request, res: Response) => {
    const staffs = await staffService.getStaffs();
    return res.status(StatusCodes.OK).send({ staffs });
});

export const getStaffDeliveries = CatchAsync(async (req: Request, res: Response) => {
    const staffs = await staffService.getStaffDeliveries();
    return res.status(StatusCodes.OK).send({ staffs });
});

export const getStaff = CatchAsync(async (req: Request, res: Response) => {
    const staff = await staffService.getStaff(req.params.staffID);
    return res.status(StatusCodes.OK).send({ staff });
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

// Update Status by Staff Delivery
export const updateStatus = CatchAsync(async (req: Request, res: Response) => {
    const updatedStatus = await orderService.updateStatus(req.params.orderID, req.params.staffID, req.body.status);
    return res.status(StatusCodes.OK).send({ updatedStatus });
});

export const login = CatchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const staff = await staffService.loginWithEmail(email, password);
    const token = await tokenService.generateJwtToken(staff);
    res.setHeader('Authorization', token);
    res.status(StatusCodes.OK).send({ staff, token });
});
