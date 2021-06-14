const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeStaff = new Schema(
  {
    name: { type: String, required: true },
    note: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("typestaffs", TypeStaff);