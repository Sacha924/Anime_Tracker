const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, unique: true },
  password: { type: String, required: true },
  secret: { type: String },
  QRcodeURL: { type: String },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
