const express = require("express");
const bookController = require("../controller/book");

const bookRouter = express.Router();

bookRouter.post('/', bookController.createBook);
bookRouter.get('/', bookController.findAllBooks);
bookRouter.get('/:bookId', bookController.findBookById);
bookRouter.patch('/:bookId', bookController.updateBook);
bookRouter.delete('/:bookId', bookController.deleteBook);

module.exports = bookRouter;
