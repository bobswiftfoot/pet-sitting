const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// Create user model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {}
}
