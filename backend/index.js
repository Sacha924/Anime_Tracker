const express = require("express");
const animeController = require("./animes/animes_controller");
const userController = require("./users/users_controller");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
require("./auth/googleAuth");
const passport = require("passport");

const app = express();
const port = 3000;

app.use(
  session({
    secret: "YOUR_SECRET_HERE",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/users", userController);
app.use("/animes", animeController);

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] }, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
  })
);
app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:8080/app",
    failureRedirect: "http://localhost:8080/",
  })
);

const main = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
main();
