const { Pet } = require("../models");

const petData = [
  {
    pet_name: "Buster",
    user_id: 2,
  },
  {
    pet_name: "Ash",
    user_id: 2,
  },
  {
    pet_name: "Wilma",
    user_id: 1,
  },
  {
    pet_name: "Babe Ruth",
    user_id: 5,
  },
  {
    pet_name: "Carly Cookie Dough",
    user_id: 4,
  },
  {
    pet_name: "Cinnamon Toast Crunch",
    user_id: 3,
  },
  {
    pet_name: "Tweedle Dee",
    user_id: 1,
  },
  {
    pet_name: "Snowflake",
    user_id: 2,
  },
  {
    pet_name: "Arnold",
    user_id: 1,
  },
];

const seedPet = () => Pet.bulkCreate(petData);

module.exports = seedPet;
