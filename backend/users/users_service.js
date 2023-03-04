const userModel = require("./users_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { AuthClient } = require("google-auth-library");
require("dotenv").config();

// for the email part
const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

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
    res.status(400).json({ code: "pour l'instant r" });
  }
}

async function sendOTPCode(req, res) {
  try {
    const email = req.body.email;
    const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Access Code for AnimeTracker app",
      text: `Your access code is ${code}`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "OTP Code sent to your email",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to send OTP code",
    });
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
  sendOTPCode,
  getAllUsers,
  checkPassword,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
};
