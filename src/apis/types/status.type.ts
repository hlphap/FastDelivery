import { Document, Schema } from 'mongoose';

export interface IStatus extends Document {
    name: string;
    note: string;
    code: string;
    afterStatus: Array<Schema.Types.ObjectId> | Array<IStatus>;
}
