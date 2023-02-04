const express = require("express");
const animeController = require("./animes/animes_controller");
const animeController = require("./animes/users_controller");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/users", userController);
app.use("/animes", animeController);

const main = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
main();
