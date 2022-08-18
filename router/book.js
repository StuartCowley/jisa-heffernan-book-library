const express = require("express");
const bookController = require("../controller/book");

const bookRouter = express.Router();

bookRouter.post('/', bookController.createBook);
bookRouter.get('/', bookController.findAllBooks);

module.exports = bookRouter;
