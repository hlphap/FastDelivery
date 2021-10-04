import { District } from '../models';
import { IDistrict } from '../types';

export const getDistricts = async function (): Promise<Array<IDistrict>> {
    return District.find({});
};
