const { User, Cuisine, Category, History } = require("../models");

const log = async (data) => {
  const { title, description, updatedBy } = data;

  const test = await History.create({ title, description, updatedBy });
};

module.exports = { log };
