const crudHelper = require("./helper");

exports.createGenre = async (req, res) => {
  crudHelper.createEntries(req, res, "genre");
};

exports.findAllGenres = async (_, res) => {
  crudHelper.findAllEntries(res, "genre");
};

exports.findGenreById = async (req, res) => {
  const { genreId } = req.params;
  crudHelper.findEntryById(genreId, res, "genre");
};

exports.updateGenre = async (req, res) => {
  const { genreId } = req.params;
  crudHelper.updateDetails(genreId, req, res, "genre");
};

exports.deleteGenre = async (req, res) => {
  const { genreId } = req.params;
  crudHelper.deleteEntry(genreId, res, "genre");
};
