const { User, Cuisine, Category, PubUser, Bookmark } = require("../models");
const { Op } = require("sequelize");
const { hash, compareHash } = require("../helpers/hash");
const { createToken } = require("../helpers/token");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");

class Public {
  static async register(req, res, next) {
    const { email, password } = req.body;
    try {
      const newUser = await PubUser.create({
        email,
        password,
        role: "customer",
      });
      const access_token = createToken({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      });

      res.status(201).json({
        id: newUser.id,
        role: newUser.role,
        email: newUser.email,
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        throw {
          name: "Unauthorized",
          message: "Username & Password required !",
        };

      const user = await PubUser.findOne({ where: { email } });
      if (!user || !(await compareHash(password, user.password)))
        throw { name: "Unauthorized", message: "Invalid email or password !" };

      const access_token = createToken({ id: user.id, email, role: user.role });
      res.status(200).json({
        id: user.id,
        email: user.email,
        role: user.role,
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async cuisineAll(req, res, next) {
    try {
      let { page = 1, search } = req.query;

      const limit = 8;
      const offset = (page - 1) * limit;
      const option = { limit, offset };

      option.offset = page * option.limit - option.limit;

      if (search) option.where = { name: { [Op.iLike]: `%${search}%` } };

      const data = await Cuisine.findAll(option);
      const totalData = await Cuisine.count({ where: option.where });

      console.log(option);

      const result = {
        search,
        currentPage: page,
        totalPage: Math.ceil(totalData / limit),
        total: data.length,
        data,
      };

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async cuisineDetail(req, res, next) {
    try {
      const cuisine = await Cuisine.findByPk(req.params.id);

      if (!cuisine) throw { name: "Not Found", message: "404 Data Not Found" };

      // const { data } = await axios({
      //   // url: "https://api.qr-code-generator.com/v1/create?access-token=Fso6qkjdABmDziUPWSetEttVvQXD1o-PAnl5jXLSIvcv_dKUIXFAFD6idhVBbIsF",
      //   // method: "GET",
      //   // params: {
      //   //   frame_name: "no-frame",
      //   //   qr_code_text: `https://vue-week3.monsterx.my.id/detail/${req.params.id}`,
      //   //   image_format: "SVG",
      //   },
      // });

      // res.status(200).json({ ...cuisine.toJSON(), QRcode: data });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async getBookmark(req, res, next) {
    try {
      const bookmark = await Bookmark.findAll({
        attributes: { exclude: ["updatedAt", "createdAt"] },
        include: Cuisine,
        where: { PubUserId: req.user.id },
        order: [["id", "DESC"]],
      });
      res.status(200).json(bookmark);
    } catch (err) {
      next(err);
    }
  }

  static async addBookmark(req, res, next) {
    try {
      const { CuisineId } = req.params;
      const bookmark = await Bookmark.create({
        PubUserId: req.user.id,
        CuisineId,
      });
      res.status(201).json(bookmark);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Public;
