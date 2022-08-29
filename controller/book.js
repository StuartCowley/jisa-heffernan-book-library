const crudHelper = require("./helper");

exports.createBook = async (req, res) => {
  crudHelper.createEntries(req, res, 'book');
};

exports.findAllBooks = async (req, res) => {
  const queryString = req.query;
  try {
    if (Object.keys(queryString).length === 0) {
      crudHelper.findAllEntries(res, 'book');
    } else {
      crudHelper.findEntriesUsingQuery(queryString, res, 'book');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findBookById = async (req, res) => {
  const { bookId } = req.params;
  crudHelper.findEntryById(bookId, res, 'book');
};

exports.updateBook = async (req, res) => {
  const { bookId } = req.params;
  crudHelper.updateDetails(bookId, req, res, 'book');
};

exports.deleteBook = async (req, res) => {
  const { bookId } = req.params;
  crudHelper.deleteEntry(bookId, res, 'book');
};
