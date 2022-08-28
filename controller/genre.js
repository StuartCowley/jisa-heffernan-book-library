const { Genre } = require("../src/models/index");
const crudHelper = require("./helper");

exports.createGenre = async (req, res) => {
    crudHelper.createEntries(req, res, Genre);
};