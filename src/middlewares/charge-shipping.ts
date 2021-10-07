/* eslint-disable no-underscore-dangle */
import { StatusCodes } from 'http-status-codes';
import { DVMethod, Store } from '../apis/models';
import { IFee, IOrder } from '../apis/types';
import { CustomError } from '../utils/custom-error';

export const chargeShipping = async function (
    order: IOrder,
    options: {
        changeAddress?: boolean;
        storage?: boolean;
    } = {
        changeAddress: false,
        storage: false,
    },
): Promise<IFee> {
    const fee = <IFee>{
        standard: 0,
        surCharge: 0,
        commission: 0,
        changeAddressDelivery: 0,
        storageCharge: 0,
        return: 0,
        total: 0,
    };

    const dvMethod = await DVMethod.findById(order.useDVMethod._id);
    const ownerStore = await Store.findById(order.ownerStoreID);

    if (!dvMethod) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Delivery method not found when charge-shipping');
    }

    if (!ownerStore) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Store not found when charge-shipping');
    }

    const storeDistrictID = ownerStore.address.ward.district.id;
    const receiverDistrictID = order.receiverAddress.ward.district.id;

    // Create Fee No Commission
    if (storeDistrictID === receiverDistrictID) {
        fee.standard = dvMethod.innerDistrictFee;
        if (order.weight > 3) {
            fee.surCharge = dvMethod.surChargeInner * ((order.weight - 3) / 0.5);
        }
    } else {
        fee.standard = dvMethod.outerDistrictFee;
        if (order.weight > 3) {
            fee.surCharge = dvMethod.surChargeOuter * ((order.weight - 3) / 0.5);
        }
    }

    // Check Commission
    if (order.useCommission) {
        fee.commission = (ownerStore.commission.ratioCommission * fee.standard) / 100;
    }

    // Check Change Address
    if (options.changeAddress) {
        fee.changeAddressDelivery = dvMethod.feeChangeAddressDelivery;
    }

    // Check Storage
    if (options.storage) {
        fee.storageCharge = dvMethod.feeStorageCharges;
    }

    // Calc Total Fee
    fee.total =
        fee.standard + fee.surCharge + fee.commission + fee.changeAddressDelivery + fee.storageCharge + fee.return;

    return fee;
};
