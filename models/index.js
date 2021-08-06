const User = require("./User");
const Pet = require("./Pet");
const CareDay = require("./CareDay");
const Comment = require("./Comment");
const Post = require("./Post");

User.hasMany(Pet, {
  foreignKey: "user_id",
});

Pet.belongsTo(User, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Pet.hasMany(CareDay, {
  foreignKey: "pet_id",
});

CareDay.belongsTo(Pet, {
  foreignKey: "pet_id",
});

User.hasMany(CareDay, {
  foreignKey: "user_id",
});

CareDay.belongsTo(User, {
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
