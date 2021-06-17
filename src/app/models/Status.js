const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Status = new Schema(
  {
    name: { type: String },
    note: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("statuses", Status);
