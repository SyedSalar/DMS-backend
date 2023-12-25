"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserDocumentAssociation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserDocumentAssociation.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      masterDocumentId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      companyId: {
        type: DataTypes.INTEGER,
      },
      createDocument: {
        type: DataTypes.BOOLEAN,
      },
      reviewDocument: {
        type: DataTypes.BOOLEAN,
      },
      approveDocument: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "user_document_permissions",
    }
  );
  return UserDocumentAssociation;
};
