const userModel = require("./users_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

async function checkPassword(username, password) {
  const user = await userModel.findOne({ username });
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return false;
  }
  return user;
}

async function registerUser(req, res) {
  const hash = await bcrypt.hash(req.body.password, 10);
  let user = {
    username: req.body.username,
    password: hash,
  };
  userModel
    .create(user)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
}

async function loginUser(req, res) {
  const payload = {
    sub: req.user._id,
  };
  let token = jwt.sign(payload, process.env.JWT_SECRET);
  res.status(200).json({ token });
}

async function getQRCode(req, res) {
  const secret = speakeasy.generateSecret({ length: 20 });
  QRCode.toDataURL(secret.otpauth_url, function (err, data) {
    res.status(200).json({ QRcodeURL: data, secret: secret.ascii });
  });
}

async function verifyCode(req, res) {
  let bool = speakeasy.totp.verify({
    secret: req.body.secret,
    encoding: "ascii",
    token: req.body.token,
  });
  if (bool) {
    res.status(200).json({ msg: "Code correct" });
  } else {
    res.status(400).json({ msg: "Code incorrect" });
  }
}

async function getAllUsers(req, res) {
  userModel
    .find({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
}

async function getCurrentUser(req, res) {
  res.json({
    id: req.user.id,
    username: req.user.username,
    password: req.user.password,
    secret: req.user.secret,
    QRcodeURL: req.user.QRcodeURL,
  });
}

async function updateCurrentUser(req, res) {
  userModel
    .findOneAndUpdate(
      { _id: req.user._id },
      {
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        secret: req.body.secret,
        QRcodeURL: req.body.QRcodeURL,
      },
      {
        new: true,
        runValidators: true,
      }
    )
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: error }));
}

async function deleteCurrentUser(req, res) {
  mangaModel
    .findOneAndDelete({ _id: req.user._id })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: error }));
}

module.exports = {
  registerUser,
  loginUser,
  getQRCode,
  verifyCode,
  getAllUsers,
  checkPassword,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
};
