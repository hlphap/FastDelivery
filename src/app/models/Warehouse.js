const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Warehouse = new Schema(
  {
    name: { type: String, required: true, unique: true },
    idAddress: { type: mongoose.Schema.Types.ObjectId, ref: "addresses" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("warehouses", Warehouse);
