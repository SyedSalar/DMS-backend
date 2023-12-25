"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("documents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      companyId: {
        type: Sequelize.INTEGER,
      },
      departmentId: {
        type: Sequelize.INTEGER,
      },
      projectId: {
        type: Sequelize.INTEGER,
      },
      masterDocumentId: {
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.TEXT,
      },
      extension: {
        type: Sequelize.STRING,
      },
      fileName: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        //   values:['pending,']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("documents");
  },
};
