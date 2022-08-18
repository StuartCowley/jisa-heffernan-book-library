const Op = require("Sequelize").Op;
const { Reader } = require("../src/models/index");

exports.createReader = async (req, res) => {
  try {
    const createReaderInDb = await Reader.create(req.body);
    res.status(201).json(createReaderInDb);
  } catch (err) {
    res.status(500).json(err);
  }
};

//not 100% happy with this, want to refactor it.
exports.findAllReaders = async (req, res) => {
  const queryName = req.query.name;
  const queryEmail = req.query.email;

  try {
    if (!queryName && !queryEmail) {
      // if (!queryName) {
      const findAllReadersInDb = await Reader.findAll();
      console.log("all " + queryName);
      res.status(200).json(findAllReadersInDb);
    } else {
      const [findReaderByCondition] = await Reader.findAll({
        where: {
          [Op.or]: [{ ...(queryName && {name: queryName}) }, { ...(queryEmail && {email: queryEmail}) }],
        },
      });
      // const [findReaderByCondition] = await Reader.findAll({
      //   where: { name: queryName },
      // });
      if (!findReaderByCondition) {
        console.log("error");
        res.status(404).json({ error: "The reader could not be found." });
      } else {
        console.log("reader by name " + queryName);
        res.status(200).json(findReaderByCondition);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
    res.status(500).json(err);
  }
};

exports.updateReaderDetails = async (req, res) => {
  const { readerId } = req.params;
  try {
    const findReaderById = await Reader.findByPk(readerId);
    if (!findReaderById) {
      res.status(404).json({ error: "The reader could not be found." });
    } else {
      const updateReaderInDb = await Reader.update(req.body, {
        where: { id: readerId },
      });
      res.status(200).json(updateReaderInDb);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteReader = async (req, res) => {
  const { readerId } = req.params;
  try {
    const findReaderById = await Reader.findByPk(readerId);
    if (!findReaderById) {
      res.status(404).json({ error: "The reader could not be found." });
    } else {
      const deleteReaderFromDb = await Reader.destroy({
        where: { id: readerId },
      });
      res.status(204).json(deleteReaderFromDb);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
