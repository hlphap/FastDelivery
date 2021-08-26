import mongoose, { Document } from "mongoose";

interface IDistrict extends Document {
    name: string,
}

export default IDistrict;