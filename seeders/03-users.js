"use strict";
const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          companyId: 1,
          roleId: 1,
          email: "salarjafri@zentrum.com",
          firstName: "Salar",
          lastName: "Jafri",
          password: bcrypt.hashSync("Zentrum1234!", 8),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
