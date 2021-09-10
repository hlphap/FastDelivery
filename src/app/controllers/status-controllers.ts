import { Request, Response, NextFunction } from "express";
import { Status } from "../models/status";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const status = await Status.find({})
                            .populate("afterStatus")

    return res.status(200).json(status);
}

const getNextStatus = async (req: Request, res: Response, next: NextFunction) => {
    const { statusID } = req.params;

    const status = await Status.findOne({_id: statusID})
                            .populate("afterStatus")

    return res.status(200).json(status?.afterStatus);
}

export default {
    getNextStatus,
    getAll,
}