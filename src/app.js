const express = require("express");
const readerRouter = require("../router/reader");
const bookRouter = require("../router/book");
const authorRouter = require("../router/author");
const genreRouter = require("../router/genre");

const app = express();

app.use(express.json());
app.use("/readers", readerRouter);
app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/genres", genreRouter);

module.exports = app;
