const { Book } = require("../src/models/index");

exports.createBook = async (req, res) => {
  try {
    const createBookInDb = await Book.create(req.body);
    res.status(201).json(createBookInDb);
  } catch (err) {
    res.status(500).json({ error: "Book not created." });
  }
};

exports.findAllBooks = async (req, res) => {
  try {
    const findAllBooksInDb = await Book.findAll();
    res.status(200).json(findAllBooksInDb);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.findBookById = async (req, res) => {
  const { bookId } = req.params;
  try {
    const findBookByIdInDb = await Book.findByPk(bookId);
    if (!findBookByIdInDb) {
      res.status(404).json({ error: "The book could not be found." });
    } else {
      res.status(200).json(findBookByIdInDb);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.updateBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const findBookByIdInDb = await Book.findByPk(bookId);
    if (!findBookByIdInDb) {
      res.status(404).json({ error: "The book could not be found." });
    } else {
      const updateBookInDb = await Book.update(req.body, {
        where: { id: bookId },
      });
      res.status(200).json(updateBookInDb);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.deleteBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const findBookByIdInDb = await Book.findByPk(bookId);
    if (!findBookByIdInDb) {
      res.status(404).json({ error: "The book could not be found." });
    } else {
      const deleteBookInDb = await Book.destroy({
        where: { id: bookId },
      });
      res.status(204).json(deleteBookInDb);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};
