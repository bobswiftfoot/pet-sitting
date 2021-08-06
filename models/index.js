const User = require("./User");
const Pet = require("./Pet");
const CareDay = require("./CareDay");
const Comment = require("./Comment");
const Post = require("./Post");

User.hasMany(Pet, {
  as: 'pets',
  foreignKey: "user_id",
});

Pet.belongsTo(User, {
  as: 'owner',
  foreignKey: "user_id",
});

Post.belongsTo(User, {
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

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

module.exports = { User, Pet, CareDay, Comment, Post };
