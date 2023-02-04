const userModel = require("./users_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
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
  });
}

async function updateCurrentUser(req, res) {
  userModel
    .findOneAndUpdate(
      { _id: req.user._id },
      {
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
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
  getAllUsers,
  checkPassword,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
};
