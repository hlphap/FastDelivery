const path = require("path");
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index");
const db = require("./config/db/index");

//Declare App
const app = express();
const port = 3000;

//Connect
db.connect();

//Static file
app.use(express.static(path.join(__dirname, "public")));

//Config Json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//HTTP logger
app.use(morgan("combined"));

//Routes
routes(app);
app.listen(port, () => {
  console.log(`Fast Delivery Server listening at port: ${port}`);
});
