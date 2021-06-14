const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Staff = new Schema(
  {
    fullName: { type: String, require: true },
    gender: { type: String, default: "Nam" },
    dateOfBirth: { type: String, default: "01/01/2000" },
    idNumber: { type: String, require: true },
    phone: { type: String, require: true },
    basicSalary: { type: String, default: "0" },
    actualSalary: { type: String, default: "0" },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    idTypeStaff : {type:mongoose.Schema.Types.ObjectId, ref : "typestaffs", require: true},
    idCommission : {type:mongoose.Schema.Types.ObjectId, ref : "commissionstaffs", require: true},
    idAddress : {type:mongoose.Schema.Types.ObjectId, ref : "addresses", require: true}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("staffs", Staff);
