const { Category, Cuisine, User } = require("../models/index");
const { hash, compareHash } = require("../helpers/hash");
const { createToken } = require("../helpers/token");
const { OAuth2Client } = require("google-auth-library");

class Auth {
  static async register(req, res, next) {
    // console.log(req.body);
    const { username, email, password, phoneNumber, address } = req.body;
    try {
      if (!email || !password) {
        throw { name: "EmailPasswordRequired" };
      }
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw { name: "EmailAlreadyExists" };
      }
      let user = await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });
      // res.json(user)
      res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "EmailPasswordRequired" };
      }

      let user = await User.findOne({ where: { email: email } });

      if (!user || !compareHash(password, user.password)) {
        throw { name: "InvalidEmailPassword" };
      }

      let access_token = createToken({ id: user.id });
      console.log(access_token);
      res
        .status(200)
        .json({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          access_token,
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async google(req, res, next) {
    try {
      const { google_token } = req.headers;

      const client = new OAuth2Client();
      ``;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      let user = await User.findOne({ where: { email: payload.email } });

      if (!user) {
        user = await User.create({
          username: payload.name,
          email: payload.email,
          password: "Oauth2" + Date.now(),
          role: "staff",
          phoneNumber: "08696969696699",
          address: "-",
        });
      }

      const access_token = createToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        access_token,
      });
    } catch (err) {
      console.error("Google login error:", err);
      next(err);
    }
  }
}

module.exports = Auth;
