const { Genre } = require("../src/models/index");
const crudHelper = require("./helper");

exports.createGenre = async (req, res) => {
    crudHelper.createEntries(req, res, Genre);
};

exports.findAllGenres = async (_, res) => {
    crudHelper.findAllEntries(res, Genre);
};

exports.findGenreById = async (req, res) => {
    const { genreId } = req.params;
    crudHelper.findEntryById(genreId, res, Genre);
};

exports.updateGenre = async (req, res) => {
    const { genreId } = req.params;
    crudHelper.updateDetails(genreId, req, res, Genre);
};

exports.deleteGenre = async (req, res) => {
    const { genreId } = req.params;
    crudHelper.deleteEntry(genreId, res, Genre);
};