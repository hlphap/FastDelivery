import { Document } from 'mongoose';
import { IAddress } from './address.type';

export interface IWarehouse extends Document {
    name: string;
    address: IAddress;
}
