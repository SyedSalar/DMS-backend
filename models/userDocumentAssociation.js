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
      documentId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      allowView: {
        type: DataTypes.BOOLEAN,
      },
      allowEdit: {
        type: DataTypes.BOOLEAN,
      },
      documentCreator: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "user_document_associations",
    }
  );
  return UserDocumentAssociation;
};
