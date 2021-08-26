import {Request, Response, NextFunction} from "express";
import { TypeStaff } from "../models";

const getAll = async(req: Request, res: Response, next: NextFunction) => {
    const typeStaffs = await TypeStaff.find({});

    return res.status(200).json(typeStaffs);
}

export default {
    getAll,
}