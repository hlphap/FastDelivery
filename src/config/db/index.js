const mongoose = require("mongoose");

async function connect() {
  let connectionStringAtlas = "mongodb+srv://hlphap:IdYmhh1aT3OxlUr9@learnjs.szfw4.mongodb.net/fastdelivery?retryWrites=true&w=majority";
  let connectStringLocal = "mongodb://localhost:27017/fastdeliverydb?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
  let connectString = connectionStringAtlas;

  try {
    await mongoose.connect(
      connectString,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("Connected Success");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
