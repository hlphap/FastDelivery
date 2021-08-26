import {Request, Response, NextFunction} from "express";
import { Staff } from "../models/";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Called getAll");
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Called create");
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Called update");
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Called deleteOne");
}

export default {
    getAll,
    create,
    update,
    deleteOne
}