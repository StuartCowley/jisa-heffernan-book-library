exports.createEntries = async (req, res, Model) => {
  try {
    const createEntryInDb = await Model.create(req.body);
    res.status(201).json(createEntryInDb);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findAllEntries = async (res, Model) => {
  const findAllEntriesInDb = await Model.findAll();
  res.status(200).json(findAllEntriesInDb);
};

exports.findEntriesUsingQuery = async (queryString, res, Model) => {
  const [findEntryByCondition] = await Model.findAll({ where: queryString });
  res.status(200).json(findEntryByCondition);
};

exports.findEntryById = async (entryId, res, Model) => {
  try {
    const findEntryByIdInDb = await Model.findByPk(entryId);
    if (!findEntryByIdInDb) {
      res.status(404).json({ error: `The entry could not be found.` });
    } else {
      res.status(200).json(findEntryByIdInDb);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateDetails = async (entryId, req, res, Model) => {
  try {
    const findEntryById = await Model.findByPk(entryId);
    if (!findEntryById) {
      res.status(404).json({ error: "The entry could not be found." });
    } else {
      const updateEntryInDb = await Model.update(req.body, {
        where: { id: entryId },
      });
      res.status(200).json(updateEntryInDb);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteEntry = async (entryId, res, Model) => {
  try {
    const findEntryByIdInDb = await Model.findByPk(entryId);
    if (!findEntryByIdInDb) {
      res.status(404).json({ error: "The entry could not be found." });
    } else {
      const deleteEntryInDb = await Model.destroy({
        where: { id: entryId },
      });
      res.status(204).json(deleteEntryInDb);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
