import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CatchAsync from '../../utils/catch-async';
import { storeService, tokenService } from '../services';

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

export const login = CatchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const store = await storeService.loginWithEmail(email, password);
    const token = await tokenService.generateJwtToken(store);
    res.setHeader('Authorization', token);
    res.status(StatusCodes.OK).send({ store, token });
});

export const getOrdersFromStore = CatchAsync(async (req: Request, res: Response) => {
    const orders = await storeService.getOrdersFromStore(req.params.staffID, req.query);
    return res.status(StatusCodes.OK).send({ orders });
});
