import { Request, Response, NextFunction } from "express";
import { IOrder } from "../../interfaces";
import { Store } from "../models";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const stores = await Store.find({});

    return res.status(200).json(stores);
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    const store = req.body;

    const newStore = new Store(store);

    await newStore.save();

    return res.status(200).json({
        status: 200,
        message: "Create Store Successfully",
    })
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const { storeID } = req.params;

    const store = req.body;

    const foundStore = await Store.findOne({_id: storeID});

    if (foundStore){
        foundStore.overwrite(store);
        foundStore.save();
        return res.status(200).json({
            status: 200,
            message: "Update Store Successfully",
        })
    }else{
        return res.status(404).json({
            status: 494,
            message: "Store Not Found"
        })
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const { storeID } = req.params;

    await Store.findByIdAndDelete(storeID);

    return res.status(200).json({
        status: 200,
        message: "Delete Store Successfully",
    })
}

const statistics = async (req: Request, res: Response, next: NextFunction) => {
    const { storeID } = req.params;

    const store = await Store.findOne({})
                            .populate("orders");

    const orders : Array<IOrder> = <Array<IOrder>>store.orders;

    const statistic = orders.reduce((result, order) => {
        if (order.updatedAt.getMonth() == new Date().getMonth()){
            if (order.tracking[0].status.code == process.env.STATUS_DELIVERY_SUCCESSFULLY || order.tracking[0].status.code == process.env.STATUS_DELIVERY_FAILED) {
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
    },{
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
    })
    return res.status(200).json(statistic);
}

export default {
    getAll,
    create,
    update,
    deleteOne,
    statistics,
}
