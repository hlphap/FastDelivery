import mongoose from "mongoose";
import { IWareHouse } from "../../interfaces";
import { AddressSchema } from "./address";

const Schema = mongoose.Schema;

const WareHouseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: AddressSchema,
        required: true,
    }
},{
    timestamps: true,
    versionKey: false,
})

WareHouseSchema.pre<IWareHouse>("save", async function(next){
    try {
        //Generate fullAddress
        this.address.fullAddress = `${this.address.noteAddress}, ${this.address.ward.name}, ${this.address.ward.district.name}`;
        next();
    }
    catch(err){
        next(err);
    }
})

const WareHouse = mongoose.model<IWareHouse>("warehouses", WareHouseSchema);

export {
    WareHouse,
    WareHouseSchema,
}
