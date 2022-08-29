const { Reader, Book, Author, Genre } = require("../src/models/index");

const getModel = (model) => {
  if (model === "reader") {
    return Reader;
  }
  if (model === "book") {
    return Book;
  }
  if (model === "author") {
    return Author;
  }
  if (model === "genre") {
    return Genre;
  }
};

const getIncludes = (model) => {
  if (model === "book") return { include: [Genre, Author] };

  if (model === "genre" || model === "author") return { include: Book };

  return {};
};

const removePassword = (obj) => {
  if (obj.hasOwnProperty("password")) {
    delete obj.password;
  }

  return obj;
};

const get404Error = (model) => ({ error: `The ${model} could not be found.` });

exports.createEntries = async (req, res, model) => {
  const Model = getModel(model);
  try {
    const createEntryInDb = await Model.create(req.body);
    const entryWithoutPassword = removePassword(createEntryInDb.dataValues);
    res.status(201).json(entryWithoutPassword);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findAllEntries = async (res, model) => {
  const Model = getModel(model);
  const includeModel = getIncludes(model);
  const findAllEntriesInDb = await Model.findAll({ ...includeModel });
  const entriesWithoutPassword = findAllEntriesInDb.map((item) =>
    removePassword(item.dataValues)
  );
  res.status(200).json(entriesWithoutPassword);
};

exports.findEntriesUsingQuery = async (queryString, res, model) => {
  const Model = getModel(model);
  const [findEntryByCondition] = await Model.findAll({ where: queryString });
  const newValue = removePassword(findEntryByCondition.dataValues);
  res.status(200).json(newValue);
};

exports.findEntryById = async (entryId, res, model) => {
  const Model = getModel(model);
  const includeModel = getIncludes(model);
  try {
    const findEntryByIdInDb = await Model.findByPk(entryId, {
      ...includeModel,
    });
    if (!findEntryByIdInDb) {
      res.status(404).json(get404Error(model));
    } else {
      const entryWithoutPassword = removePassword(findEntryByIdInDb.dataValues);
      res.status(200).json(entryWithoutPassword);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateDetails = async (entryId, req, res, model) => {
  const Model = getModel(model);
  try {
    const findEntryById = await Model.findByPk(entryId);
    if (!findEntryById) {
      res.status(404).json(get404Error(model));
    } else {
      const updateEntryInDb = await Model.update(req.body, {
        where: { id: entryId },
      });

      const findUpdatedEntryById = await Model.findByPk(entryId);
      const entryWithoutPassword = removePassword(
        findUpdatedEntryById.dataValues
      );
      res.status(200).json(entryWithoutPassword);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.deleteEntry = async (entryId, res, model) => {
  const Model = getModel(model);
  try {
    const findEntryByIdInDb = await Model.findByPk(entryId);
    if (!findEntryByIdInDb) {
      res.status(404).json(get404Error(model));
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
