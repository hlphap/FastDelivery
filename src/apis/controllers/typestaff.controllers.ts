import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CatchAsync from '../../utils/catch-async';
import { typeStaffService } from '../services';

export const getTypeStaffs = CatchAsync(async (req: Request, res: Response) => {
    const typeStaffs = await typeStaffService.getTypeStaffs();
    return res.status(StatusCodes.OK).send({ typeStaffs });
});
