const { Model, DataTypes } = require("sequelize");
const Sequelize = require("../config/connection");

// Create Pet model
class Pet extends Model {}

// create fields/columns for Pet models
Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pet_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    modelName: "pet",
  }
);

// export Pet model
module.exports = Pet;
