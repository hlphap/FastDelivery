import { Document } from "mongoose";

interface IStatus extends Document {
    name: string,
    note: string,
    beforeStatus: Array<IStatus>,
    afterStatus: Array<IStatus>,
}

export default IStatus;