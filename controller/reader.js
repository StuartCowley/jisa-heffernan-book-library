const { query } = require("express");
const { Reader } = require("../src/models/index");

exports.createReader = async (req, res) => {
  try {
    const createReaderInDb = await Reader.create(req.body);
    res.status(201).json(createReaderInDb);
  } catch (err) {
    res.status(500).json({ error: "Reader not created" });
  }
};

exports.findAllReaders = async (req, res) => {
  const queryString = req.query;
  try {
    if (!queryString) {
      const findAllReadersInDb = await Reader.findAll();
      res.status(200).json(findAllReadersInDb);
    } else {
      console.log(queryString);
      const findReader = await Reader.findAll({ where: queryString });
      res.status(200).json(findReader);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.findReaderById = async (req, res) => {
  const { readerId } = req.params;
  const findReaderInDb = await Reader.findByPk(readerId);
  res.status(200).json(findReaderInDb);
};
