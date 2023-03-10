// contain the Mongoose model that define the structure of anime in the MongoDB database

const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastEpisodeView: { type: Number, required: true },
  currentSeason: { type: Number },
  maxEpPerSeason: { type: Number },
  coverUrl: { type: String },
  animeLink: { type: String },
  userNameWhoAddIt: { type: String },
});

const Anime = mongoose.model("animes", animeSchema); // so animes is the name of my collection on the DB

module.exports = Anime;
