"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("users", [
      {
        uuid: uuidv4(),
        name: "default user",
        email: "default@email.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("users", null, {});
  },
};
