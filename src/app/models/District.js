const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const District = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("districts", District);
