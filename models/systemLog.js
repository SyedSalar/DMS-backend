"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SystemLogModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SystemLogModel.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      companyId: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "system_logs",
    }
  );
  return SystemLogModel;
};
