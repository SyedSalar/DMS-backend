"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      details: {
        type: DataTypes.TEXT,
      },
      industry: {
        type: DataTypes.STRING,
      },
      // documentNumberFormat: {
      //   type: DataTypes.STRING,
      // },
    },
    {
      sequelize,
      modelName: "company",
      freezeTableName: true,
    }
  );
  return Company;
};
