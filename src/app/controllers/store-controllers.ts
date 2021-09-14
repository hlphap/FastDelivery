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

    console.log(orders[0].weight);
}

export default {
    getAll,
    create,
    update,
    deleteOne,
    statistics,
}
