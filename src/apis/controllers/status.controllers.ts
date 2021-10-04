import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CatchAsync from '../../utils/catch-async';
import { statusService } from '../services';

export const getStatus = CatchAsync(async (req: Request, res: Response) => {
    const status = await statusService.getStatus();
    return res.status(StatusCodes.OK).send({ status });
});

export const getNextStatus = CatchAsync(async (req: Request, res: Response) => {
    const status = await statusService.getNextStatus(req.params.statusID);
    return res.status(StatusCodes.OK).send({ status });
});
