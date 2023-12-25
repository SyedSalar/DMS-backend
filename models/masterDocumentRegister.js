"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MasterDocumentRegister extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MasterDocumentRegister.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      companyId: {
        type: DataTypes.INTEGER,
      },
      departmentId: {
        type: DataTypes.INTEGER,
      },
      projectId: {
        type: DataTypes.INTEGER,
      },
      authorId: {
        type: DataTypes.INTEGER,
      },
      authorName: {
        type: DataTypes.STRING,
      },
      noOfDocuments: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "master_document_registers",
    }
  );
  return MasterDocumentRegister;
};
