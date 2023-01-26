const express = require("express");
const animeController = require("./animes/animes_controller");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/animes", animeController);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
