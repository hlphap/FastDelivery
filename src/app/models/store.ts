import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IStore } from "../../interfaces";
import { AddressSchema } from "./address";
import { BankSchema } from "./bank";
import { CMStoreSchema } from "./cmstore";

const Schema = mongoose.Schema;

const StoreSchema = new Schema<IStore>({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    accountName: {
        type: String,
        default: "Account Name Bank",
    },
    accountNumber: {
        type: String,
        unique: true,
    },
    branchBank: {
        type: String,
        default: "Branch Bank",
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bank: {
        type: BankSchema,
    },
    commission: {
        type: CMStoreSchema
    },
    address: {
        type: AddressSchema
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
    }],
},{
    timestamps: true,
    versionKey: false,
})

StoreSchema.pre<IStore>("save", async function(next){
    try{
        //Generate fullAddress
         this.address.fullAddress = `${this.address.noteAddress}, ${this.address.ward.name}, ${this.address.ward.district.name}`;

        //Hash password
        //Generate a salt
        const salt = await bcrypt.genSalt(10);

        //Generate password hash (salt + hash)
        const passwordHashed = await bcrypt.hash(this.password, salt);

        //Re-assign the password hashed
        this.password = passwordHashed;

        next();
    }
    catch(err){
        next(err);
    }
})

const Store = mongoose.model<IStore>("stores", StoreSchema);

export {
    Store,
    StoreSchema,
}
