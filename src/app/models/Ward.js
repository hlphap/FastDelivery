const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ward = new Schema(
  {
    name: { type: String },
    idDistrict: { type: mongoose.Schema.Types.ObjectId, ref: "districts" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("wards", Ward);
