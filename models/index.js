const User = require("./User");
const Pet = require("./Pet");
const CareDay = require("./CareDay");

User.hasMany(Pet, {
  foreignKey: "user_id",
});
Pet.belongsTo(User, {
  foreignKey: "user_id",
});
User.belongsToMany(CareDay, {
  through: Pet,
  // how do I connect to scheduled days? Should I add this in the model?
  as: "scheduled_days",
  foreignKey: "user_id",
});
CareDay.belongsTo(Pet, {
  foreignKey: "pet_id",
});

module.exports = { User, Pet, CareDay };
