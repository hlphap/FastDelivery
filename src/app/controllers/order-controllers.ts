import { Request, Response, NextFunction } from "express";
import { ChargeShipping } from "../../functions";
import { IOrder, IStatus, IStore } from "../../interfaces";
import { Order, Staff } from "../models";
import { Status } from "../models/status";


const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({})

    return res.status(200).json(orders);
}

const getOrderNotYetHandle = async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({
        $or: [
            {"tracking": {$size: 1}},
            {"tracking": {$size: 2}},
        ]
    });

    //Set status next from order "No Process" to "Processing"
    orders.forEach(async (order) => {
        const statusNext = await Status.findOne({
            _id : order.tracking[0].status.afterStatus[0],
        })
        if (statusNext.code == process.env.STATUS_PROCESSING) {
            order.tracking.unshift({
                status: statusNext,
            });
            order.save();
        }
    })

    return res.status(200).json(orders);
}

const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    /**
     * Params orderID:
     * Body => {
     *      status: IStatus,
     *      staff: IStaff,
     *}
     */
    const { orderID } = req.params;
    const staffID = req.body.staff._id;

    const order = await Order.findOne({_id: orderID});
    const staff = await Staff.findOne({_id: staffID});

    if (!order) {
        return res.status(404).json({
            status: 404,
            message: "Order Not Found",
        })
    }

    if (!staff) {
        return res.status(404).json({
            status: 404,
            message: "Staff Not Found",
        })
    }

    //Find status Next
    const statusPresent = order.tracking[0].status;
    let statusNext = <IStatus>{};

    if (statusPresent.code == process.env.STATUS_PROCESSING) {
        statusNext = await Status.findOne({
            _id : order.tracking[0].status.afterStatus[0],
        })
    } else {
        const foundStatus = await Status.findOne({_id: req.body._id});
        if (foundStatus)
            statusNext = foundStatus;
    }

    //Save status next to Order
    if (!statusNext) {
        return res.status(404).json({
            status: 404,
            message: "Cannot Find Status Next",
        })
    }

    order.tracking.unshift({
        status: statusNext,
        chargeStaffID: staff._id,
    });

    await order.save();

    //Add order to staff
    staff.work.unshift(order._id);
    await staff.save();

    return res.status(200).json({
        status: 200,
        message: "Update New Status Successfully",
    })
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    const order = req.body;

    const newOrder = new Order(order);

    const statusDefault = await Status.findOne({code: process.env.STATUS_DEFAULT});

    newOrder.tracking.unshift({
        status: statusDefault,
    });

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

const calcFee = async (req: Request, res: Response, next: NextFunction) => {
    const order: IOrder = req.body;

    const chargeShipping = await ChargeShipping(order);

    return res.status(200).json(chargeShipping);
}

const statistic = async (req: Request, res: Response, next: NextFunction) => {
    const ordersPromise = Order.find({});
    const staffsPromise = Staff.find({});

    const [orders, staffs] = await Promise.all([ordersPromise, staffsPromise]);

    //Revenue
    const deliveryRevenue = orders.reduce((result, order)=>{
        if (order.updatedAt.getMonth() == new Date().getMonth()){
            result.countAllOrders++;
            result.revenue += order.fee.total;
            if (order.tracking[0].status.code == process.env.STATUS_DELIVERY_SUCCESSFULLY){
                result.countOrderSuccess++;
            }
            if (order.tracking[0].status.code == process.env.STATUS_DELIVERY_FAILED) {
                result.countOrderFailed++;
            }

        }
        return result;
    }, {
        countAllOrders: 0,
        countOrderSuccess: 0,
        countOrderFailed: 0,
        revenue: 0,
    })

    //Salary
    const deliveryCost = staffs.reduce((result, staff) => {
        result.salaryAmount += staff.actualSalary;
        return result;
    },{
        salaryAmount : 0,
    })

    //Data to Client
    let profit = deliveryCost.salaryAmount - deliveryRevenue.revenue;
    const data = {
        deliveryRevenue: deliveryRevenue.revenue,
        salaryAmount: deliveryCost.salaryAmount,
        profit: profit,
        countAllOrder: deliveryRevenue.countAllOrders,
        countOrderSuccess: deliveryRevenue.countOrderSuccess,
        countOrderFailed: deliveryRevenue.countOrderFailed,
    }
    res.status(200).json(data)
}

export default {
    getAll,
    create,
    update,
    updateStatus,
    deleteOne,
    getOrderNotYetHandle,
    statistic,
    calcFee,
}

