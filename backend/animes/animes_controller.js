// This file is used to map API calls (Presentation Layer) with the Business-Logic layer
const router = require("express").Router();
const animesService = require("./animes_service");
const passport = require("passport");
require("../auth/jwt.strategy");

router.get("/", animesService.getAllAnime);

router.get("/:userName", animesService.getAllAnimeByUserName);

router.get("/id/:id", animesService.getAnime);

router.post("/", passport.authenticate("jwt"), animesService.createAnime);

router.put("/:id", passport.authenticate("jwt"), animesService.updateAnime);

router.delete("/:id", passport.authenticate("jwt"), animesService.deleteAnime);

module.exports = router;
