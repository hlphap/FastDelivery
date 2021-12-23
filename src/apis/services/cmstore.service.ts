import { StatusCodes } from 'http-status-codes';
import { ICMStore } from '../types';
import { CMStore } from '../models';
import { CustomError } from '../../utils/custom-error';

export const getCMStores = async function (): Promise<Array<ICMStore>> {
    return CMStore.find({});
};

export const getCMStore = async function (cmStoreID: string) {
    const foundCMStore = await CMStore.findById(cmStoreID);
    if (!foundCMStore) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Commission store not found');
    }
    return foundCMStore;
};

export const createCMStore = async function (cmStore: ICMStore): Promise<ICMStore> {
    return CMStore.create(cmStore);
};

export const updateCMStore = async function (cmStoreID: string, cmStore: ICMStore): Promise<ICMStore> {
    const foundCMStore = await CMStore.findById(cmStoreID);
    if (!foundCMStore) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Commission store not found');
    }
    return CMStore.findByIdAndUpdate(cmStoreID, cmStore, {
        new: true,
    });
};

export const deleteCMStore = async function (cmStoreID: string): Promise<ICMStore> {
    const foundCMStore = await CMStore.findById(cmStoreID);
    if (!foundCMStore) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Commission store not found');
    }
    return CMStore.findByIdAndDelete(cmStoreID);
};
