import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CatchAsync from '../../utils/catch-async';
import { storeService } from '../services';

export const getStores = CatchAsync(async (req: Request, res: Response) => {
    const stores = await storeService.getStores();
    return res.status(StatusCodes.OK).send({ stores });
});

export const getStore = CatchAsync(async (req: Request, res: Response) => {
    const store = await storeService.getStore(req.params.storeID);
    return res.status(StatusCodes.OK).send({ store });
});

export const createStore = CatchAsync(async (req: Request, res: Response) => {
    const newStore = await storeService.createStore(req.body);
    return res.status(StatusCodes.CREATED).send({ newStore });
});

export const updateStore = CatchAsync(async (req: Request, res: Response) => {
    const updatedStore = await storeService.updateStore(req.params.storeID, req.body);
    return res.status(StatusCodes.OK).send({ updatedStore });
});

export const deleteStore = CatchAsync(async (req: Request, res: Response) => {
    const deletedStore = await storeService.deleteStore(req.params.storeID);
    return res.status(StatusCodes.OK).send({ deletedStore });
});

export const getStatistics = CatchAsync(async (req: Request, res: Response) => {
    const statistics = await storeService.getStatistics(req.params.storeID);
    return res.status(StatusCodes.OK).send({ statistics });
});
