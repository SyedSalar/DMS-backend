"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "roles",
      [
        {
          id: 1,
          companyId: 1,
          title: "CEO",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          companyId: 1,
          title: "Employee",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          companyId: 1,
          title: "Client",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
