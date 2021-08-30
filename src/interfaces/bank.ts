import { Document } from "mongoose";

interface IBank extends Document {
    shortName: string,
    vnName: string,
}

export default IBank;