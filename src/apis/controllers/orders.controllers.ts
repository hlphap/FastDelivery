import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CatchAsync from '../../utils/catch-async';
import { orderService } from '../services';

export const getOrders = CatchAsync(async (req: Request, res: Response) => {
    const orders = await orderService.getOrders();
    return res.status(StatusCodes.OK).send({ orders });
});

export const getOrder = CatchAsync(async (req: Request, res: Response) => {
    const order = await orderService.getOrder(req.params.orderID);
    return res.status(StatusCodes.OK).send({ order });
});

export const orderNotYetHandle = CatchAsync(async (req: Request, res: Response) => {
    const orders = await orderService.orderNotYetHandle();
    return res.status(StatusCodes.OK).send({ orders });
});

export const calcFeeDelivery = CatchAsync(async (req: Request, res: Response) => {
    const fee = await orderService.calcFeeDelivery(req.body);
    return res.status(StatusCodes.OK).send({ fee });
});

// Update Status by Staff Manager
export const assignmentOrderToStaffDelivery = CatchAsync(async (req: Request, res: Response) => {
    const updatedStatusOrder = await orderService.updateStatus(req.params.orderID, req.body.staff);
    return res.status(StatusCodes.OK).send({ updatedStatusOrder });
});

export const createOrder = CatchAsync(async (req: Request, res: Response) => {
    const newOrder = await orderService.createOrder(req.body);
    return res.status(StatusCodes.CREATED).send({ newOrder });
});

export const updateOrder = CatchAsync(async (req: Request, res: Response) => {
    const updatedOrder = await orderService.updateOrder(req.params.orderID, req.body);
    return res.status(StatusCodes.OK).send({ updatedOrder });
});

export const deleteOrder = CatchAsync(async (req: Request, res: Response) => {
    const deletedOrder = await orderService.deleteOrder(req.params.orderID);
    return res.status(StatusCodes.OK).send({ deletedOrder });
});

export const calcFee = CatchAsync(async (req: Request, res: Response) => {
    const fee = await orderService.calcFeeDelivery(req.body);
    return res.status(StatusCodes.OK).send({ fee });
});

export const statistics = CatchAsync(async (req: Request, res: Response) => {
    const statistic = await orderService.statistic();
    return res.status(StatusCodes.OK).send({ statistic });
});

export const trackingOrder = CatchAsync(async (req: Request, res: Response) => {
    const tracking = await orderService.trackingOrder(req.params.orderID);
    const order = await orderService.getOrder(req.params.orderID);
    return res.status(StatusCodes.OK).send({ tracking, order });
});
