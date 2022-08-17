const express = require('express');
const app = express();
const readerRouter = require('../router/reader');

app.use(express.json());
app.use('/readers', readerRouter);

module.exports = app;