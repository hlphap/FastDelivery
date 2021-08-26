import { Request, Response, NextFunction } from "express";
import { Ward } from "../models";

const getAll = async(req: Request, res: Response, next: NextFunction) => {
    const wards = await Ward.find({});

    return res.status(200).json(wards);
}

export default {
    getAll,
}