"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/hash");
module.exports = (sequelize, DataTypes) => {
  class PubUser extends Model {
    static associate(models) {
      // define association here
      PubUser.hasMany(models.Bookmark, { foreignKey: "PubUserId" });
    }
  }
  PubUser.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email already register !" },
        validate: {
          notEmpty: { msg: "Email is required !" },
          notNull: { msg: "Email is required !" },
          isEmail: { msg: "Invalid email !" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required !" },
          notNull: { msg: "Password is required !" },
          len: [5, 50],
        },
      },
      role: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "PubUser",
      hooks: {
        beforeCreate: (user) => {
          user.password = hash(user.password);
        },
      },
    }
  );
  return PubUser;
};
