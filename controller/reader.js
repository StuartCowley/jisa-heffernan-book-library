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

//not 100% happy with this, want to refactor it.
exports.findAllReaders = async (req, res) => {
  const queryString = req.query.name;

  try {
    if (!queryString) {
      const findAllReadersInDb = await Reader.findAll();
      console.log('all ' + queryString);
      res.status(200).json(findAllReadersInDb);
    } else {
      console.log(queryString);
      const [findReaderByCondition] = await Reader.findAll({
        where: {name: queryString}
      });
      if (!findReaderByCondition) {
        console.log('error');
        res.status(404).json({ error: "The reader could not be found." });
      } else {
        console.log('reader by name ' + queryString)
        res.status(200).json(findReaderByCondition);
      }
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.findReaderById = async (req, res) => {
  const { readerId } = req.params;
  try {
    const findReaderInDb = await Reader.findByPk(readerId);
    if (!findReaderInDb) {
      res.status(404).json({ error: "The reader could not be found." });
    } else {
      res.status(200).json(findReaderInDb);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};
