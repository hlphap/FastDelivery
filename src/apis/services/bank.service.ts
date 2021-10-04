import { Bank } from "../models";
import { IBank } from "../types";

export const getBanks = async function (): Promise<Array<IBank>> {
    return Bank.find({});
};
