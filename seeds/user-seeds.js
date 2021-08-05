const sequelize = require("../config/connection");
const { User } = require("../models");

const userData = [
  {
    user_name: "rainsample2",
    email: "rsample2@gmail.com",
    password: "password123",
  },
  {
    user_name: "onelove43",
    email: "onelove@gmail.com",
    password: "youcantguessthis",
  },
  {
    user_name: "fireandice24",
    email: "brr1212@gmail.com",
    password: "hotandcold",
  },
  {
    user_name: "anotherexample14",
    email: "ae14@gmail.com",
    password: "freezedance2!8",
  },
  {
    user_name: "incredible980",
    email: "hulk980@gmail.com",
    password: "superhuman01",
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
