exports.createEntries = async (req, res, Model) => {
  try {
    const createEntryInDb = await Model.create(req.body);
    const entryWithoutPassword = removePassword(createEntryInDb.dataValues);
    res.status(201).json(entryWithoutPassword);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findAllEntries = async (res, Model) => {
  const findAllEntriesInDb = await Model.findAll();
  const entriesWithoutPassword = findAllEntriesInDb.map((item) =>
    removePassword(item.dataValues)
  );
  res.status(200).json(entriesWithoutPassword);
};

exports.findEntriesUsingQuery = async (queryString, res, Model) => {
  const [findEntryByCondition] = await Model.findAll({ where: queryString });
  const newValue = removePassword(findEntryByCondition.dataValues);  
  res.status(200).json(newValue);
};

exports.findEntryById = async (entryId, res, Model) => {
  try {
    const findEntryByIdInDb = await Model.findByPk(entryId);
    if (!findEntryByIdInDb) {
      res.status(404).json({ error: `The entry could not be found.` });
    } else {
      const entryWithoutPassword = removePassword(findEntryByIdInDb.dataValues);
      res.status(200).json(entryWithoutPassword);
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
      
      const findUpdatedEntryById = await Model.findByPk(entryId);
      const entryWithoutPassword = removePassword(findUpdatedEntryById.dataValues);
      res.status(200).json(entryWithoutPassword);
    }
  } catch (err) {
    console.log(err);
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

const removePassword = (obj) => {
  if (obj.hasOwnProperty("password")) {
    delete obj.password;
  }

  return obj;
};
