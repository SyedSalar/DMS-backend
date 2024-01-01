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
<<<<<<< HEAD
=======
      documentNumberFormat: {
        type: DataTypes.STRING,
      },
>>>>>>> 7bc30328623d716de78b68038c1a9a520d3f84da
    },
    {
      sequelize,
      modelName: "company",
<<<<<<< HEAD
=======
      freezeTableName: true,
>>>>>>> 7bc30328623d716de78b68038c1a9a520d3f84da
    }
  );
  return Company;
};
