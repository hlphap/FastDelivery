import { Request, Response, NextFunction } from "express";
import { Ward } from "../models";

const getWardOfDistrict = async (req: Request, res: Response, next: NextFunction) => {
    const { districtID } = req.params;

    const wards = await Ward.find({"district._id": districtID});

    return res.status(200).json(wards);
}

export default {
    getWardOfDistrict,
}