import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../utils/custom-error';
import { District, Ward } from '../models';
import { IWard } from '../types';

export const getWardsByDistrict = async function (districtID: string): Promise<Array<IWard>> {
    const foundDistrict = await District.findById(districtID);
    if (!foundDistrict) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'District not found');
    }
    return Ward.find({ 'district._id': districtID });
};
