const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Store = new Schema(
  {
    name: { type: String },
    idBank: { type: mongoose.Schema.Types.ObjectId, ref: "banks" },
    idAddress: { type: mongoose.Schema.Types.ObjectId, ref: "addresses" },
    idCommission: {type: mongoose.Schema.Types.ObjectId, ref: "commissionstores", default: "60cb1f91eb12ef48f8f4abf8"},
    phone: { type: String },
    accountName: { type: String },
    accountNumber: { type: String },
    branchBank: { type: String },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("stores", Store);
