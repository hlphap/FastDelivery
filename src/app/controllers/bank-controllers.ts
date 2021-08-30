import { Request, Response, NextFunction } from "express-serve-static-core";
import { Bank } from "../models";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const banks = await Bank.find({});

    return res.status(200).json(banks);
}

export default {
    getAll,
}
