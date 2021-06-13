const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://hlphap:IdYmhh1aT3OxlUr9@learnjs.szfw4.mongodb.net/fastdelivery?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
