const { Pet } = require("../models");

const petData = [
  {
    pet_name: "Buster",
    user_id: 2,
    pet_animal: "cat",
    pet_breed: "tabby",
  },
  {
    pet_name: "Ash",
    user_id: 2,
    pet_animal: "cat",
    pet_breed: "russian blue",
  },
  {
    pet_name: "Wilma",
    user_id: 1,
    pet_animal: "turtle",
    pet_breed: "red ear slider",
  },
  {
    pet_name: "Babe Ruth",
    user_id: 5,
    pet_animal: "pig",
  },
  {
    pet_name: "Carly Cookie Dough",
    user_id: 4,
    pet_animal: "dog",
    pet_breed: "mix",
  },
  {
    pet_name: "Cinnamon Toast Crunch",
    user_id: 3,
    pet_animal: "cat",
    pet_breed: "mix",
  },
  {
    pet_name: "Tweedle Dee",
    user_id: 1,
    pet_animal: "dog",
    pet_breed: "golden retriever",
  },
  {
    pet_name: "Snowflake",
    user_id: 2,
    pet_animal: "dog",
  },
  {
    pet_name: "Arnold",
    user_id: 1,
    pet_animal: "cat",
    pet_breed: "tabby",
  },
];

const seedPet = () => Pet.bulkCreate(petData);

module.exports = seedPet;
