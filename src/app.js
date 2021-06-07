const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Fast Delivery Server listening at port: ${port}`);
});
