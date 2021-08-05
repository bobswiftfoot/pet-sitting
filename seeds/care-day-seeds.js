const { CareDay } = require("../models");

const CareDayData = [
  {
    pet_id: 2,
  },
  {
    pet_id: 4,
    user_id: 1,
  },
  {
    pet_id: 2,
  },
  {
    pet_id: 3,
    user_id: 5,
  },
  {
    pet_id: 2,
    user_id: 3,
  },
  {
    pet_id: 2,
  },
  {
    pet_id: 9,
  },
];

const seedCareDay = () => CareDay.bulkCreate(careDayData);

module.exports = seedCareDay;
