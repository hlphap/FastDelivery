import {Request, Response, NextFunction} from "express"
import CMStaff from "../models/cmstaff"

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const cmstaffs = await CMStaff.find({});

    return res.status(200).json(cmstaffs);
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    const cmstaff = new CMStaff(req.body);

    await cmstaff.save();

    return res.status(200).json({
        status: 200,
        message: "Create Commission Staff Successfully",
    })
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const { cmStaffID } = req.params;

    const newCMStaff = req.body;

    await CMStaff.findByIdAndUpdate(cmStaffID, newCMStaff);

    return res.status(200).json({
        status: 200,
        message: "Update Commission Staff Successfully",
    })
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const { cmStaffID } = req.params;

    await CMStaff.findByIdAndDelete(cmStaffID);

    return res.status(200).json({
        status: 200,
        message: "Delete Commission Staff Successfully",
    })
}

export default {
    getAll,
    create,
    update,
    deleteOne,
}