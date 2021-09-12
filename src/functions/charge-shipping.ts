import { NextFunction } from "express";
import { DVMethod, Store } from "../app/models";
import { IOrder, IFee, IDVMethod } from "../interfaces";

async function ChargeShipping(order: IOrder, options: {
    changeAddress?: boolean,
    storage?: boolean,
} = {
    changeAddress: false,
    storage: false,
}, next: NextFunction) {
    const fee = <IFee>{
        standard: 0,
        surCharge: 0,
        commission: 0,
        changeAddressDelivery: 0,
        storageCharge: 0,
        return: 0,
        total: 0,
    };

    const dvMethod = await DVMethod.findOne({_id: order.useDVMethod._id});
    const ownerStore = await Store.findOne({_id: order.ownerStoreID});

    const storeDistrictID = ownerStore.address.ward.district._id;
    const receiverDistrictID = order.receiverAddress.ward.district._id;

    //Create Fee No Commission
    if (storeDistrictID == receiverDistrictID) {
        fee.standard = dvMethod.innerDistrictFee;
        if (order.weight > 3) {
            fee.surCharge = dvMethod.surChargeInner * ((order.weight - 3) / 0.5) ;
        }
    }else{
        fee.standard = dvMethod.outerDistrictFee;
        if (order.weight > 3){
            fee.surCharge = dvMethod.surChargeOuter * ((order.weight - 3) / 0.5);
        }
    }

    //Check Commission
    if (order.useCommission) {
        fee.commission = ownerStore.commission.ratioCommission * fee.standard / 100;
    }


    //Check Change Address
    if (options.changeAddress) {
        fee.changeAddressDelivery = dvMethod.feeChangeAddressDelivery;
    }

    //Check Storage
    if (options.storage) {
        fee.storageCharge = dvMethod.feeStorageCharges;
    }

    //Calc Total Fee
    fee.total = fee.standard + fee.surCharge + fee.commission + fee.changeAddressDelivery + fee.storageCharge + fee.return;

    //Assignment fee to order
    order.fee = fee;
}

export default ChargeShipping;