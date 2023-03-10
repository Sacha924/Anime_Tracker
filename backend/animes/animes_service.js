// This file holds the Business-Logic layer, interacting with Data Layer
const animeModel = require("./animes_model");

exports.getAllAnime = (req, res) => {
  animeModel
    .find()
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllAnimeByUserName = (req, res) => {
  animeModel
    .find({ userNameWhoAddIt: req.params.userName })
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json({ error }));
};

exports.getAnime = (req, res) => {
  animeModel
    .findOne({ _id: req.params.id })
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json({ error }));
};

exports.createAnime = (req, res) => {
  animeModel
    .create(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

exports.updateAnime = (req, res) => {
  animeModel
    .findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: error }));
};

// req.params.id accessible car l'url c'est router.delete("/:id", animesService.deleteAnime);
exports.deleteAnime = (req, res) => {
  animeModel
    .findOneAndDelete({ _id: req.params.id })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: error }));
};
