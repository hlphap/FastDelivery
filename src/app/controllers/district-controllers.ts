import {Request, Response, NextFunction} from "express";
import { District } from "../models";

const getAll = async(req: Request, res: Response, next: NextFunction) => {
    const districts = await District.find({});

    return res.status(200).json(districts);
}

export default {
    getAll,
}