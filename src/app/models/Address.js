const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Address = new Schema(
  {
    fullAddress: { type: String, default: ""},
    noteAddress: { type: String, default: ""},
    idWard: { type: mongoose.Schema.Types.ObjectId, ref: "wards" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("addresses", Address);
