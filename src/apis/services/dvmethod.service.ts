import httpStatus from "http-status-codes";

import { DVMethod } from "../models";
import { IDVMethod } from "apis/types";
import { CustomError } from "../../utils/custom-error";

export const getDVMethods = async function (): Promise<Array<IDVMethod>> {
    return DVMethod.find({});
};

export const createDVMethod = async function (dvMethod: IDVMethod): Promise<IDVMethod> {
    return DVMethod.create(dvMethod);
};

export const updateDVMethod = async function (dvMethodID: string, dvMethod: IDVMethod): Promise<IDVMethod> {
    const foundDVMethod = await DVMethod.findById(dvMethodID);
    if (!foundDVMethod) {
        throw new CustomError(httpStatus.NOT_FOUND, "mongoose", "Delivery Method Not Found");
    }
    return DVMethod.findByIdAndUpdate(dvMethodID, dvMethod, {
        new: true,
    });
};

export const deleteDVMethod = async function (dvMethodID: string) {
    const foundDVMethod = await DVMethod.findById(dvMethodID);
    if (!foundDVMethod) throw new CustomError(httpStatus.NOT_FOUND, "mongoose", "Delivery method not found");
    return DVMethod.findByIdAndDelete(dvMethodID);
};
