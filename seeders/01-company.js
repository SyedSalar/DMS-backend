"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "company",
      [
        {
          id: 1,
          name: "Zentrum",
          documentNumberFormat: "projectCode-departName-mdrCode-docNumber",
          details:
            "Zentrum is your go-to AI wizard, conjuring up mind-bending solutions with custom machine learning, NLP, and computer vision magic. Ethically wielding the AI wand, we're on a quest to supercharge businesses in healthcare, finance, e-commerce, and beyond.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("company", null, {});
  },
};
