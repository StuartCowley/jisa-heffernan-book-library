const Op = require("Sequelize").Op;
const { Reader } = require("../src/models/index");
const crudHelper = require("./helper");

exports.createReader = async (req, res) => {
  crudHelper.createEntries(req, res, Reader);
};

exports.findAllReaders = async (req, res) => {
  const queryName = req.query.name;
  const queryEmail = req.query.email;

  try {
    if (!queryName && !queryEmail) {
      // const findAllReadersInDb = await Reader.findAll();
      // console.log("all " + queryName);
      // res.status(200).json(findAllReadersInDb);
      crudHelper.findAllEntries(res, Reader);
    } else {
      // Model.findAll({
      //   where: Sequelize.and(
      //     { name: 'a project' },
      //     Sequelize.or(
      //       { id: [1,2,3] },
      //       { id: { gt: 10 } }
      //     )
      //   )
      // })
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
  crudHelper.findEntryById(readerId, res, Reader);
};

exports.updateReaderDetails = async (req, res) => {
  const { readerId } = req.params;
  crudHelper.updateDetails(readerId, req, res, Reader);
};

exports.deleteReader = async (req, res) => {
  const { readerId } = req.params;
  crudHelper.deleteEntry(readerId, res, Reader);
};
