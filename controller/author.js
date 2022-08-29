const crudHelper = require("./helper");

exports.createAuthor = async (req, res) => {
  crudHelper.createEntries(req, res, "author");
};

exports.findAllAuthors = async (_, res) => {
  crudHelper.findAllEntries(res, "author");
};

exports.findAuthorById = async (req, res) => {
  const { authorId } = req.params;
  crudHelper.findEntryById(authorId, res, "author");
};

exports.updateAuthor = async (req, res) => {
  const { authorId } = req.params;
  crudHelper.updateDetails(authorId, req, res, "author");
};

exports.deleteAuthor = async (req, res) => {
  const { authorId } = req.params;
  crudHelper.deleteEntry(authorId, res, "author");
};
