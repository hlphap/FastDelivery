import {Request, Response, NextFunction} from "express";
import { WareHouse } from "../models";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const warehouses = await WareHouse.find({});

    return res.status(200).json(warehouses);
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    const wareHouse = req.body;

    const newWareHouse = new WareHouse(wareHouse);

    await newWareHouse.save();

    return res.status(200).json({
        status: 200,
        message: "Create Ware House Successfully"
    })
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    const { wareHouseID } = req.params;

    const wareHouse = req.body;

    const foundWareHouse = await WareHouse.findOne({_id: wareHouseID});

    if (foundWareHouse){
        foundWareHouse.overwrite(wareHouse);
        await foundWareHouse.save();
        return res.status(200).json({
            status: 200,
            message: "Update Ware House Successfully",
        })
    }else{
        return res.status(200).json({
            status: 400,
            message: "Ware House Not Found"
        })
    }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const { wareHouseID } = req.params;

    await WareHouse.findByIdAndDelete(wareHouseID);

    return res.status(200).json({
        status: 200,
        message: "Delete Ware House Successfully",
    })
}

export default {
    getAll,
    create,
    update,
    deleteOne,
}
