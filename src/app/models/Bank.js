const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bank = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Bank", Bank);
