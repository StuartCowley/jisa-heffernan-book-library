const Op = require("Sequelize").Op;
const { Reader } = require("../src/models/index");
const crudHelper = require("./helper");

exports.createReader = async (req, res) => {
  crudHelper.createEntries(req, res, "reader");
};

exports.findAllReaders = async (req, res) => {
  const queryName = req.query.name;
  const queryEmail = req.query.email;

  try {
    if (!queryName && !queryEmail) {
      crudHelper.findAllEntries(res, "reader");
    } else {
      const [findReaderByCondition] = await Reader.findAll({
        where: {
          [Op.or]: [
            { ...(queryName && { name: queryName }) },
            { ...(queryEmail && { email: queryEmail }) },
          ],
        },
      });
      if (!findReaderByCondition) {
        res.status(404).json({ error: "The reader could not be found." });
      } else {
        res.status(200).json(findReaderByCondition);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findReaderById = async (req, res) => {
  const { readerId } = req.params;
  crudHelper.findEntryById(readerId, res, "reader");
};

exports.updateReaderDetails = async (req, res) => {
  const { readerId } = req.params;
  crudHelper.updateDetails(readerId, req, res, "reader");
};

exports.deleteReader = async (req, res) => {
  const { readerId } = req.params;
  crudHelper.deleteEntry(readerId, res, "reader");
};
