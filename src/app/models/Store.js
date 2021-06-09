const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Store = new Schema(
  {
    name: { type: String },
    idBank: { type: mongoose.Schema.Types.ObjectId, ref: "banks" },
    idAddress: { type: mongoose.Schema.Types.ObjectId, ref: "addresses" },
    phone: { type: String },
    accountName: { type: String },
    accountNumber: { type: String },
    branchBank: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("stores", Store);
