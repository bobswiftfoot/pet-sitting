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
    // day
    day_of_care: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    // type of care for
    // day
    type_of_care: {
      type: DataTypes.STRING,
      allowNull: false,
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
