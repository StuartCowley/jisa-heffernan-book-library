const express = require("express");
const authorController = require("../controller/author");

const authorRouter = express.Router();

authorRouter.post("/", authorController.createAuthor);
authorRouter.get("/", authorController.findAllAuthors);
authorRouter.get("/:authorId", authorController.findAuthorById);
authorRouter.patch("/:authorId", authorController.updateAuthor);
authorRouter.delete("/:authorId", authorController.deleteAuthor);

module.exports = authorRouter;
