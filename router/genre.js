const express = require("express");
const genreController = require("../controller/genre");

const genreRouter = express.Router();

genreRouter.post("/", genreController.createGenre);
genreRouter.get("/", genreController.findAllGenres);
genreRouter.get("/:genreId", genreController.findGenreById);
genreRouter.patch("/:genreId", genreController.updateGenre);
genreRouter.delete("/:genreId", genreController.deleteGenre);

module.exports =  genreRouter;

