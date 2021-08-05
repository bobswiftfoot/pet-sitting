const seedUsers = require("./user-seeds");
const seedPet = require("./pet-seeds");
const seedCareDay = require("./care-day");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("------------------");

  await seedUsers();
  console.log("------------------");

  await seedPet();
  console.log("------------------");

  await seedCareDay();
  console.log("------------------");

  process.exit(0);
};

seedAll();
