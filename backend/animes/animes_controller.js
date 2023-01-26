// This file is used to map API calls (Presentation Layer) with the Business-Logic layer

const router = require("express").Router();
const animesService = require("./animes_service");

router.get("/", animesService.getAllAnime);

router.get("/:id", animesService.getAnime);

router.post("/", animesService.createAnime);

router.put("/:id", animesService.updateAnime);

router.delete("/:id", animesService.deleteAnime);

module.exports = router;
