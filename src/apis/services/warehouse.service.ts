import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../utils/custom-error';
import { Warehouse } from '../models';
import { IWarehouse } from '../types';

export const getWarehouses = async function (): Promise<Array<IWarehouse>> {
    return Warehouse.find({});
};

export const createWarehouse = async function (warehouse: IWarehouse): Promise<IWarehouse> {
    return Warehouse.create(warehouse);
};

export const updateWarehouse = async function (warehouseID: string, warehouse: IWarehouse): Promise<IWarehouse> {
    const foundWarehouse = await Warehouse.findById(warehouseID);
    if (!foundWarehouse) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Warehouse not found');
    }
    return Warehouse.findByIdAndUpdate(warehouseID, warehouse, {
        new: true,
    });
};

export const deleteWarehouse = async function (warehouseID: string): Promise<IWarehouse> {
    const foundWarehouse = await Warehouse.findById(warehouseID);
    if (!foundWarehouse) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Warehouse not found');
    }
    return Warehouse.findByIdAndDelete(warehouseID);
};
