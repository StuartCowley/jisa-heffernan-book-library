const { Book } = require("../src/models/index");

exports.createBook = async (req, res) => {
  try {
    const createBookInDb = await Book.create(req.body);
    res.status(201).json(createBookInDb);
  } catch (err) {
    res.status(500).json({ error: "Book not created." });
  }
};
