const crudHelper = require('./helper');

exports.createReader = async (req, res) => {
  crudHelper.createEntries(req, res, 'reader');
};

exports.findAllReaders = async (req, res) => {
  const queryName = req.query.name;
  const queryEmail = req.query.email;

  try {
    if (!queryName && !queryEmail) {
      crudHelper.findAllEntries(res, 'reader');
    } else {
      crudHelper.findEntryUsingMultipleQueries(
        queryName,
        queryEmail,
        res,
        'reader'
      );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findReaderById = async (req, res) => {
  const { readerId } = req.params;
  crudHelper.findEntryById(readerId, res, 'reader');
};

exports.updateReaderDetails = async (req, res) => {
  const { readerId } = req.params;
  crudHelper.updateDetails(readerId, req, res, 'reader');
};

exports.deleteReader = async (req, res) => {
  const { readerId } = req.params;
  crudHelper.deleteEntry(readerId, res, 'reader');
};
