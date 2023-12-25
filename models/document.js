"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Document.init(
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
      masterDocumentId: {
        type: DataTypes.INTEGER,
      },
      content: {
        type: DataTypes.TEXT,
      },
      extension: {
        type: DataTypes.STRING,
      },
      fileName: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        //   values:['pending,']
      },
    },
    {
      sequelize,
      modelName: "documents",
    }
  );
  return Document;
};
