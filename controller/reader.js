const { Reader } = require("../src/models/index");

exports.createReader = async (req, res) => {
  try {
    const createReaderInDb = await Reader.create(req.body);
    res.status(201).json(createReaderInDb);
  } catch (err) {
    res.status(500).json({ error: 'Reader not created' });
  }
};
