const express = require("express");
const genreController = require("../controller/genre");

const genreRouter = express.Router();

genreRouter.post("/", genreController.createGenre);

module.exports =  genreRouter;

