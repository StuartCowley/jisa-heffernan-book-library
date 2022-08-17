// const { Router } = require('express');
const readerController = require('../controller/reader');
// const readers = require('../src/models/reader');
const express = require('express');
// const albumController = require('../controller/albums');

const readerRouter = express.Router();

// const readerRouter = new Router();

readerRouter.post('/', readerController.createReader);

module.exports = readerRouter