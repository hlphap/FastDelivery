import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CatchAsync from '../../utils/catch-async';
import { warehouseService } from '../services';

export const getWarehouses = CatchAsync(async (req: Request, res: Response) => {
    const warehouses = await warehouseService.getWarehouses();
    return res.status(StatusCodes.OK).send({ warehouses });
});

export const getWarehouse = CatchAsync(async (req: Request, res: Response) => {
    const warehouse = await warehouseService.getWarehouse(req.params.warehouseID);
    return res.status(StatusCodes.OK).send({ warehouse });
});

export const createWarehouse = CatchAsync(async (req: Request, res: Response) => {
    const newWarehouse = await warehouseService.createWarehouse(req.body);
    return res.status(StatusCodes.CREATED).send({ newWarehouse });
});

export const updateWarehouse = CatchAsync(async (req: Request, res: Response) => {
    const updatedWarehouse = await warehouseService.updateWarehouse(req.params.warehouseID, req.body);
    return res.status(StatusCodes.OK).send({ updatedWarehouse });
});

export const deleteWarehouse = CatchAsync(async (req: Request, res: Response) => {
    const deletedWarehouse = await warehouseService.deleteWarehouse(req.params.warehouseID);
    return res.status(StatusCodes.OK).send({ deletedWarehouse });
});
