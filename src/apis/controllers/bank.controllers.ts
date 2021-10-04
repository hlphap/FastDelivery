import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { bankService } from '../services';
import CatchAsync from '../../utils/catch-async';

export const getBanks = CatchAsync(async (req: Request, res: Response) => {
    const banks = await bankService.getBanks();
    return res.status(StatusCodes.OK).send(banks);
});
