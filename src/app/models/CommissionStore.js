const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommissionStore = new Schema({
        name: {type: String, require: true, default: "Commission Staff Default"},
        orderPerMonthMin : {type: String,  default: "0"},
        orderPerMonthMax : {type: String, default: "50"},
        ratioCommission : {type: String, default: "3"},
        note : {type: String, default: "Note Commission Store"},
    },
    {
        timestamps : true,
        versionKey :false,
    }
);
module.exports = mongoose.model("commissionstores", CommissionStore);


