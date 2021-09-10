import { Document } from "mongoose";

interface IStatus extends Document {
    name: string,
    note: string,
    code: string,
    afterStatus: Array<string>,
}

export default IStatus;