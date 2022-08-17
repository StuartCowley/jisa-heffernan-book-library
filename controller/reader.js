const { Reader } = require("../src/models/index");

exports.createReader = async (req, res) => {
  try {
    const createReaderInDb = await Reader.create(req.body);
    res.status(201).json(createReaderInDb);
  } catch (err) {
    res.status(500).json({ error: "Reader not created" });
  }
};

exports.findAllReaders = async (_, res) => {
  try {
    const findAllReadersInDb = await Reader.findAll();
    res.status(200).send(findAllReadersInDb);
  } catch (err) {
    res.sendStatus(500);
  }
};
