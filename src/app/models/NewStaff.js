const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewStaff = new Schema({
    email: {type: String, require: true},
    phone: {type: String, require: true},
},{
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model("newstaffs", NewStaff);