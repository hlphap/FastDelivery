import { NextFunction, Request, Response } from "express";
import CMStore from "../models/cmstore"

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const cmstores = await CMStore.find({});

    return res.status(200).json(cmstores);

}

const create = async (req: Request, res: Response, next: NextFunction) => {
    const cmstore = new CMStore(req.body);
    await cmstore.save();
    return res.status(200).json({
        status: 200,
        message: "Create Commission Store Successfully",
    })
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const { cmStoreID } = req.params;

    const newCMStore = req.body;

    await CMStore.findByIdAndUpdate(cmStoreID, newCMStore);

    return res.status(200).json({
        status: 200,
        message: "Update Commission Store Successfully",
    })
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const { cmStoreID } = req.params;

    await CMStore.findByIdAndDelete(cmStoreID);

    return res.status(200).json({
        status: 200,
        message: "Delete Commission Store Successfully",
    })
}


export default {
    getAll,
    create,
    update,
    deleteOne,
}