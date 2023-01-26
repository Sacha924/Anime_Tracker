// This file is used to map API calls (Presentation Layer) with the Business-Logic layer

const router = require("express").Router();
const animesService = require("./animes_service");

router.get("/", animesService.BasicGet);

module.exports = router;
