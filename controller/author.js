const { Author } = require("../src/models/index");
const crudHelper = require("./helper");

exports.createAuthor = async (req, res) => {
    crudHelper.createEntries(req, res, Author);
};

exports.findAllAuthors = async (_, res) => {
    crudHelper.findAllEntries(res, Author);
};

exports.findAuthorById = async (req, res) => {
    const { authorId } = req.params;
    crudHelper.findEntryById(authorId, res, Author);
};

exports.updateAuthor = async (req, res) => {
    const { authorId } = req.params;
    crudHelper.updateDetails(authorId, req, res, Author);
};

exports.deleteAuthor = async (req, res) => {
    const { authorId } = req.params;
    crudHelper.deleteEntry(authorId, res, Author);
};