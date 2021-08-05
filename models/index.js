const User = require("./User");
const Pet = require("./Pet");
const CareDay = require("./CareDay");

User.hasMany(Pet, {
  as: 'owner',
  foreignKey: "user_id",
});

Pet.belongsTo(User, {
  as: 'owner',
  foreignKey: "user_id",
});

Pet.hasMany(CareDay, {
  as: 'requested_care_days',
  foreignKey: "pet_id",
});

CareDay.belongsTo(Pet, {
  as: 'requested_care_days',
  foreignKey: "pet_id",
});

User.hasMany(CareDay, {
  as: 'sitting_days',
  foreignKey: "user_id",
});

CareDay.belongsTo(User, {
  as: 'sitting_days',
  foreignKey: "user_id",
});

module.exports = { User, Pet, CareDay };
