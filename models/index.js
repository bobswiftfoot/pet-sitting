const User = require("./User");
const Pet = require("./Pet");
const CareDay = require("./CareDay");
const Comment = require("./Comment");
const Post = require("./Post");
const File = require("./File");

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
  onDelete: 'SET NULL'
});

User.hasMany(Post, {
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
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

File.hasOne(User, {
  foreignKey: "user_id",
})

File.hasOne(Pet, {
  foreignKey: "pet_id",
})

module.exports = { User, Pet, CareDay, Comment, Post, File };
