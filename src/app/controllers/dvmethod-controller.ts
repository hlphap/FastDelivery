import { Request, Response, NextFunction } from "express"
import { DVMethod } from "../models"

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const dvmethods = await DVMethod.find({});
    res.status(200).json(dvmethods);
}

const create = async (req: Request, res: Response, next: NextFunction) =>{
    const dvMethod = new DVMethod(req.body);

    await dvMethod.save();

    return res.status(200).json({
        status: 200,
        message: "Create delivery method successfully",
    })
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const { dvMethodID } = req.params;

    const newDVMethod = req.body;

    await DVMethod.findByIdAndUpdate(dvMethodID, newDVMethod);

    return res.status(200).json({
        status: 200,
        message: "Update Delivery Method Successfully",
    })
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const { dvMethodID } = req.params;

    await DVMethod.findByIdAndDelete(dvMethodID);

    return res.status(200).json({
        status: 200,
        message: "Delete Delivery Method Successfully",
    })
}

export default {
    getAll,
    create,
    update,
    deleteOne,
};

