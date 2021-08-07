const { CareDay } = require("../models");

const careDayData = [
  {
    pet_id: 2,
    day_of_care: "08/17/21",
    type_of_care: "sit",
  },
  {
    pet_id: 4,
    user_id: 1,
    day_of_care: "08/23/21",
    type_of_care: "walk",
  },
  {
    pet_id: 2,
    day_of_care: "08/18/21",
    type_of_care: "sit",
  },
  {
    pet_id: 3,
    user_id: 5,
    day_of_care: "08/20/21",
    type_of_care: "groom",
  },
  {
    pet_id: 2,
    user_id: 3,
    day_of_care: "08/19/21",
    type_of_care: "sit",
  },
  {
    pet_id: 2,
    day_of_care: "08/20/21",
    type_of_care: "sit",
  },
  {
    pet_id: 9,
    day_of_care: "08/15/21",
    type_of_care: "groom",
  },
];

const seedCareDay = () => CareDay.bulkCreate(careDayData);

module.exports = seedCareDay;
