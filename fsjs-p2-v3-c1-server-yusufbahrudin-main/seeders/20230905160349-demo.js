"use strict";

const { hash } = require("../helpers/hash");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = require("../data/users.json").map((user) => {
      user.createdAt = new Date();
      user.updatedAt = new Date();
      user.password = hash(user.password);
      return user;
    });

    const categories = require("../data/categories.json").map((categories) => {
      categories.createdAt = new Date();
      categories.updatedAt = new Date();
      return categories;
    });

    const cuisines = require("../data/cuisines.json").map((products) => {
      products.createdAt = new Date();
      products.updatedAt = new Date();
      return products;
    });

    await queryInterface.bulkInsert("Users", users);
    await queryInterface.bulkInsert("Categories", categories);
    await queryInterface.bulkInsert("Cuisines", cuisines);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users");
    await queryInterface.bulkDelete("Categories");
    await queryInterface.bulkDelete("Cuisines");
  },
};
