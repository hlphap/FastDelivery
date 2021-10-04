import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catch-async";
import { cmStoreService } from "../services";

export const getCMStores = catchAsync(async (req: Request, res: Response) => {
    const cmStores = await cmStoreService.getCMStores();
    return res.status(StatusCodes.OK).send({ cmStores });
});

export const createCMStore = catchAsync(async (req: Request, res: Response) => {
    const newCMStore = await cmStoreService.createCMStore(req.body);
    return res.status(StatusCodes.CREATED).send({ newCMStore });
});

export const updateCMStore = catchAsync(async (req: Request, res: Response) => {
    const updatedCMStore = await cmStoreService.updateCMStore(req.params.cmStoreID, req.body);
    return res.status(StatusCodes.OK).send({ updatedCMStore });
});

export const deleteCMStore = catchAsync(async (req: Request, res: Response) => {
    const deletedCMStore = await cmStoreService.deleteCMStore(req.params.cmStoreID);
    return res.status(StatusCodes.OK).send({ deletedCMStore });
});
