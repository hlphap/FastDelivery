import {Request, Response, NextFunction} from "express";
import { Staff } from "../models/";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const staffs = await Staff.find({});

    return res.status(200).json(staffs);
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    const staff = req.body;

    const newStaff = new Staff(staff);

    await newStaff.save();

    return res.status(200).json({
        status: 200,
        message: "Create Staff Successfully"
    })
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Called update");
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Called deleteOne");
}

export default {
    getAll,
    create,
    update,
    deleteOne
}