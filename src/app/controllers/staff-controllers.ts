import {Request, Response, NextFunction} from "express";
import { Staff } from "../models";
import { SignJWT } from "../../functions";
import { IOrder, IStaff } from "../../interfaces";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const staffs = await Staff.find({});

    return res.status(200).json(staffs)
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    const staff = req.body;

    const newStaff = new Staff(staff);

    await newStaff.save();

    //Encode token
    const token = SignJWT(newStaff);

    //Set token to header
    res.setHeader('Authorization', token)

    return res.status(200).json({
        status: 200,
        message: "Create Staff Successfully"
    })
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const { staffID } = req.params;

    const staff = req.body;

    const foundStaff = await Staff.findOne({_id: staffID});

    if (!foundStaff){
        return res.status(400).json({
            status: 400,
            message: "Staff Not Found"
        })
    } else{
        foundStaff.overwrite(staff);
        await foundStaff.save();
        return res.status(200).json({
            status: 200,
            message: "Update Staff Successfully",
        })
    }

}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const { staffID } = req.params;

    const staffDeleted = await Staff.findByIdAndDelete(staffID);

    if (staffDeleted){
        return res.status(200).json({
            status: 200,
            message: "Delete Staff Successfully",
        })
    } else{
        const err = new Error("Deleted failed");
        next(err);
    }
}

const managerSignIn = async (req: Request, res: Response, next: NextFunction) => {
    const staff = <IStaff>req.user;
    const token = SignJWT(staff);
    res.setHeader("Authorization", token);
    res.status(200).json(staff);
}

const orders = async (req: Request, res: Response, next: NextFunction) => {
    const { staffID } = req.params;
    //Get staff
    const staff = await Staff.findOne({_id: staffID})
                            .populate("orders");
    //Get order from staff
    const orders = <Array<IOrder>>staff.orders;

    //return client
    return res.status(200).json(orders);
}

export default {
    getAll,
    create,
    update,
    deleteOne,
    managerSignIn,
    orders,
}
