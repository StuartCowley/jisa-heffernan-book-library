const { Book } = require("../src/models/index");
const crudHelper = require("./helper");

exports.createBook = async (req, res) => {
  crudHelper.createEntries(req, res, Book);
};

exports.findAllBooks = async (req, res) => {
  const queryString = req.query;
  try {
    if (Object.keys(queryString).length === 0) {
      crudHelper.findAllEntries(res, Book);
    } else {
      crudHelper.findEntriesUsingQuery(queryString, res, Book);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findBookById = async (req, res) => {
  const { bookId } = req.params;
  crudHelper.findEntryById(bookId, res, Book);
};

exports.updateBook = async (req, res) => {
  const { bookId } = req.params;
  crudHelper.updateDetails(bookId, req, res, Book);
};

exports.deleteBook = async (req, res) => {
  const { bookId } = req.params;
  crudHelper.deleteEntry(bookId, res, Book);
};
