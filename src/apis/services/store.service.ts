import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../utils/custom-error';
import { Store } from '../models';
import { IOrder, IStore } from '../types';

export const getStores = async function (): Promise<Array<IStore>> {
    return Store.find({});
};

export const getStore = async function (storeID: string): Promise<IStore> {
    const foundStore = await Store.findById(storeID);
    if (!foundStore) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Store not found');
    }
    return foundStore;
};

export const createStore = async function (store: IStore): Promise<IStore> {
    return Store.create(store);
};

export const updateStore = async function (storeID: string, store: IStore): Promise<IStore> {
    const foundStore = await Store.findById(storeID);
    if (!foundStore) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Store not found');
    }
    return Store.findByIdAndUpdate(storeID, store, {
        new: true,
    });
};

export const deleteStore = async function (storeID: string): Promise<IStore> {
    const foundStore = await Store.findById(storeID);
    if (!foundStore) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Store not found');
    }
    return Store.findByIdAndDelete(storeID);
};

export const getStatistics = async function (storeID: string) {
    const foundStore = await Store.findById(storeID).populate('orders');
    if (!foundStore) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Store not found');
    }
    const orders: Array<IOrder> = <Array<IOrder>>foundStore.orders;
    const statistic = orders.reduce(
        (result, order) => {
            if (order.updatedAt.getMonth() === new Date().getMonth()) {
                if (
                    order.tracking[0].status.code === process.env.STATUS_DELIVERY_SUCCESSFULLY ||
                    order.tracking[0].status.code === process.env.STATUS_DELIVERY_FAILED
                ) {
                    result.delivered.orderMoney += order.orderMoney;
                    result.delivered.surCharge += order.fee.surCharge;
                    result.delivered.standard += order.fee.standard;
                    result.delivered.commission += order.fee.commission;
                    result.delivered.changeAddressDelivery += order.fee.changeAddressDelivery;
                    result.delivered.storageCharge += order.fee.storageCharge;
                    result.delivered.return += order.fee.return;
                    result.delivered.total += order.fee.total;
                } else {
                    result.delivering.orderMoney += order.orderMoney;
                    result.delivering.surCharge += order.fee.surCharge;
                    result.delivering.standard += order.fee.standard;
                    result.delivering.commission += order.fee.commission;
                    result.delivering.changeAddressDelivery += order.fee.changeAddressDelivery;
                    result.delivering.storageCharge += order.fee.storageCharge;
                    result.delivering.return += order.fee.return;
                    result.delivering.total += order.fee.total;
                }
            }
            return result;
        },
        {
            delivered: {
                orderMoney: 0,
                standard: 0,
                surCharge: 0,
                commission: 0,
                changeAddressDelivery: 0,
                storageCharge: 0,
                return: 0,
                total: 0,
            },
            delivering: {
                orderMoney: 0,
                standard: 0,
                surCharge: 0,
                commission: 0,
                changeAddressDelivery: 0,
                storageCharge: 0,
                return: 0,
                total: 0,
            },
        },
    );
    return statistic;
};

export const loginWithEmail = async (email: string, password: string): Promise<IStore> => {
    const store = await Store.findOne({ email });

    if (!store) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'Authentication', 'Store not found');
    }

    if (!(await store.isValidPassword(password))) {
        throw new CustomError(StatusCodes.NON_AUTHORITATIVE_INFORMATION, 'Authentication', 'Password is incorrect');
    }

    return store;
};
