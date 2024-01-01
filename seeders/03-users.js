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
<<<<<<< HEAD
          email: "salarjafri@monit.com",
          firstName: "Salar",
          lastName: "Jafri",
          password: bcrypt.hashSync("Monit1234!", 8),
=======
          email: "salarjafri@zentrum.com",
          firstName: "Salar",
          lastName: "Jafri",
          password: bcrypt.hashSync("Zentrum1234!", 8),
>>>>>>> 7bc30328623d716de78b68038c1a9a520d3f84da
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
