import { Request, Response, NextFunction } from "express";
import { Order } from "../models";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({});

    return res.status(200).json(orders);
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    const order = req.body;

    const newOrder = new Order(order);

    await newOrder.save();

    return res.status(200).json({
        status: 200,
        message: "Create Order Successfully",
    })
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const { orderID } = req.params;

    const order = req.body;

    const foundOrder = await Order.findOne({_id: orderID});

    if (foundOrder){
        foundOrder.overwrite(order);
        await foundOrder.save();
        return res.status(200).json({
            status: 200,
            message: "Update Order Successfully",
        })
    } else {
        return res.status(404).json({
            status: 404,
            message: "Order Not Found",
        })
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const { orderID } = req.params;

    await Order.findByIdAndDelete(orderID);

    return res.status(200).json({
        status: 200,
        message: "Delete Order Successfully",
    })
}

export default {
    getAll,
    create,
    update,
    deleteOne,
}

