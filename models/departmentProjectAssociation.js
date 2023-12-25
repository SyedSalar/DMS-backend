"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DepartmentProjectAssociation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DepartmentProjectAssociation.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      projectId: {
        type: DataTypes.INTEGER,
      },
      departmentId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "department_project_associations",
    }
  );
  return DepartmentProjectAssociation;
};
