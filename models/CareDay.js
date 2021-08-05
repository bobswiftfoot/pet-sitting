const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Create CareDay model
class CareDay extends Model {}

// create fields/columns for CareDay models
CareDay.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "pet",
        key: "id",
      },
    },
    // sitter id through user model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "care_day",
  }
);
// export CareDay model
module.exports = CareDay;
