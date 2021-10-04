import { TypeStaff } from '../models';
import { ITypeStaff } from '../types';

export const getTypeStaffs = async function (): Promise<Array<ITypeStaff>> {
    return TypeStaff.find({});
};
