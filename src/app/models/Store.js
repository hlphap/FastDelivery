const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Store = new Schema(
  {
    name: { type: String },
    idBank: { type: mongoose.Schema.Types.ObjectId, ref: "Bank" },
    // nameStreet: { type: String },
    // Ward District
    phone: { type: String },
    accountNumber: { type: String },
    branchBank: { type: String },
    email: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Store", Store);
