"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DepartmentUserAssociation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DepartmentUserAssociation.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      departmentId: {
        type: DataTypes.INTEGER,
      },
      departmentCreator: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "department_user_associations",
    }
  );
  return DepartmentUserAssociation;
};
