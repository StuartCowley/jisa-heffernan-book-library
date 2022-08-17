// const { Router } = require('express');
// const readers = require('../src/models/reader');
// const albumController = require('../controller/albums');
const express = require("express");
const readerController = require("../controller/reader");

const readerRouter = express.Router();
// const readerRouter = new Router();

readerRouter.post("/", readerController.createReader);
readerRouter.get("/", readerController.findAllReaders);
readerRouter.get("/:readerId", readerController.findReaderById);
readerRouter.patch("/:readerId", readerController.updateReaderDetails);
readerRouter.delete("/:readerId", readerController.deleteReader);

module.exports = readerRouter;
