// contain the Mongoose model that define the structure of anime in the MongoDB database

const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  lastEpisodeView: { type: Number, required: true },
  coverUrl: { type: String },
  animeLink: { type: String },
});

const Anime = mongoose.model("animes", animeSchema);

module.exports = Anime;
