import { StatusCodes } from 'http-status-codes';
import { statusService } from '.';
import { Order, Staff, Status, Store } from '../models';
import { IOrder, IStaff, IStatus, IFee } from '../types';
import { env } from '../../configs/env';
import { CustomError } from '../../utils/custom-error';
import { chargeShipping } from '../../middlewares';

export const getOrders = async function (): Promise<Array<IOrder>> {
    return Order.find({});
};

export const getOrder = async function (orderID: string): Promise<IOrder> {
    const foundOrder = await Order.findById(orderID);
    if (!foundOrder) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Order not found');
    }
    return foundOrder;
};

export const orderNotYetHandle = async function (): Promise<Array<IOrder>> {
    const orders = await Order.find({
        $or: [{ tracking: { $size: 1 } }, { tracking: { $size: 2 } }],
    });

    orders.forEach(async (order) => {
        const statusNext = (await statusService.getNextStatus(order.tracking[0].status.id))[0];
        if (statusNext.code === env.status.processing) {
            order.tracking.unshift({
                status: statusNext,
            });
            order.save();
        }
    });

    return orders;
};

export const calcFeeDelivery = async function (order: IOrder): Promise<IFee> {
    return chargeShipping(order);
};

export const updateStatus = async function (
    orderID: string,
    staff: IStaff | string,
    status?: IStatus,
): Promise<IStatus> {
    const staffID = typeof staff === 'string' ? staff : staff._id;
    const foundStaff = await Staff.findById(staffID);
    const foundOrder = await Order.findById(orderID);

    if (!foundStaff) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Staff not found');
    }
    if (!foundOrder) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Order not found');
    }

    // Find status next
    const statusPresent = foundOrder.tracking[0].status;
    let statusNext = <IStatus>{};
    if (statusPresent.code === env.status.processing) {
        statusNext = (await statusService.getNextStatus(statusPresent._id))[0];
    } else {
        statusNext = await statusService.getDetailStatus(status.code);
    }

    if (!statusNext) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Status next not found');
    }

    // Save order
    foundOrder.tracking.unshift({
        status: statusNext,
        chargeStaffID: staffID,
    });
    foundOrder.save();

    // Add order to staff
    foundStaff.orders.unshift(foundOrder.id);
    foundStaff.save();

    return statusNext;
};

export const createOrder = async function (order: IOrder): Promise<IOrder> {
    const statusDefault = await statusService.getDetailStatus(env.status.default);
    const foundStore = await Store.findById(order.ownerStoreID);

    if (!foundStore) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Store not found');
    }

    if (!statusDefault) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Status default not found');
    }

    // Save order to Order
    const newOrder = new Order(order);
    newOrder.tracking.unshift({
        status: statusDefault,
    });

    // Save order to Store
    foundStore.orders.unshift(newOrder.id);
    foundStore.save();

    return newOrder.save();
};

export const updateOrder = async function (orderID: string, order: IOrder): Promise<IOrder> {
    const foundOrder = await Order.findByIdAndUpdate(orderID, order, {
        new: true,
    });
    if (!foundOrder) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Order not found');
    }
    return foundOrder.save();
};

export const deleteOrder = async function (orderID: string): Promise<IOrder> {
    const foundOrder = await Order.findById(orderID);
    if (!foundOrder) {
        throw new CustomError(StatusCodes.NOT_FOUND, 'mongoose', 'Order not found');
    }
    return Order.findByIdAndDelete(orderID);
};

export const statistic = async function () {
    const ordersPromise = Order.find({});
    const staffsPromise = Staff.find({});

    const [orders, staffs] = await Promise.all([ordersPromise, staffsPromise]);

    // Revenue
    const deliveryRevenue = orders.reduce(
        (result, order) => {
            if (order.updatedAt.getMonth() === new Date().getMonth()) {
                result.countAllOrders += 1;
                result.revenue += order.fee.total;
            }
            if (order.tracking[0].status.code === env.status.deliverySuccessfully) {
                result.countOrderSuccess += 1;
            }
            if (order.tracking[0].status.code === env.status.deliveryFailed) {
                result.countOrderFailed += 1;
            }
            return result;
        },
        {
            countAllOrders: 0,
            countOrderSuccess: 0,
            countOrderFailed: 0,
            revenue: 0,
        },
    );

    // Salary
    const deliveryCost = staffs.reduce(
        (result, staff) => {
            result.salaryAmount += staff.actualSalary;
            return result;
        },
        {
            salaryAmount: 0,
        },
    );

    // Return data
    const profit = deliveryCost.salaryAmount - deliveryRevenue.revenue;
    return {
        deliveryRevenue: deliveryRevenue.revenue,
        salaryAmount: deliveryCost.salaryAmount,
        profit,
        countAllOrder: deliveryRevenue.countAllOrders,
        countOrderSuccess: deliveryRevenue.countOrderSuccess,
        countOrderFailed: deliveryRevenue.countOrderFailed,
    };
};
