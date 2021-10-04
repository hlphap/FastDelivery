import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catch-async';
import { districtService, wardService } from '../services';

export const getDistricts = catchAsync(async (req: Request, res: Response) => {
    const districts = await districtService.getDistricts();
    return res.status(StatusCodes.OK).send({ districts });
});

export const getWardsByDistrict = catchAsync(async (req: Request, res: Response) => {
    const wards = await wardService.getWardsByDistrict(req.params.districtID);
    return res.status(StatusCodes.OK).send({ wards });
});
