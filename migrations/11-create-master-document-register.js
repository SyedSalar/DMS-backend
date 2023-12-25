"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("master_document_registers", {
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
      authorId: {
        type: Sequelize.INTEGER,
      },
      authorName: {
        type: Sequelize.STRING,
      },
      noOfDocuments: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("master_document_registers");
  },
};
