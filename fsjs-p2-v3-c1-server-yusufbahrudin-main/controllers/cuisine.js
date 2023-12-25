const { log } = require("../helpers/log");
const { Category, Cuisine, User, History } = require("../models/index");

class Cuisiness {
  static async getAllCuisine(req, res, next) {
    try {
      let cuisines = await Cuisine.findAll({
        include: [{ model: User }, { model: Category }],
      });
      cuisines.sort((a, b) => a.id - b.id);
      res.status(200).json(cuisines);
    } catch (error) {
      console.log(error.name, "<<<< error ini");
      next(error);
    }
  }

  static async createCuisine(req, res, next) {
    try {
      let { name, description, price, imgUrl, categoryId, status } = req.body;
      let cuisine = await Cuisine.create({
        name,
        description,
        price,
        imgUrl,
        categoryId,
        authorId: req.user.id,
        status,
      });
      if (cuisine)
        log({
          title: cuisine.name,
          description: `New ${cuisine.name} with id ${cuisine.id} created`,
          updatedBy: req.user.email,
        });
      // console.log(req.user.email);

      res.status(201).json(cuisine);
    } catch (error) {
      next(error);
    }
  }

  static async getCuisineById(req, res, next) {
    // console.log(req.params.id);
    try {
      let id = +req.params.id;
      // console.log(id, "<<< id");
      // console.log({ Product });
      let cuisine = await Cuisine.findByPk(id);
      if (!cuisine) throw { name: "NotFound" };
      res.status(200).json(cuisine);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteCuisineById(req, res, next) {
    try {
      // console.log("udah nyampe controller");
      let id = +req.params.id;
      let cuisine = await Cuisine.destroy({ where: { id } });
      // console.log(product);
      if (!cuisine) throw { name: "NotFound" };
      res.status(200).json({ msg: `Menus with id:${id} success to delete` });
    } catch (error) {
      next(error);
    }
  }

  static async getAllCategories(req, res) {
    try {
      let categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async CuisineStatus(req, res, next) {
    // console.log(req.params, "<<<< cek id dan status");
    const { id, status } = req.params;
    try {
      console.log(id, status, "<<<<<<<<<");
      if (
        status !== "Active" &&
        status !== "Inactive" &&
        status !== "Archived"
      ) {
        throw { name: "Invalid Status", message: "Status not found" };
      }

      const cuisine = await Cuisine.findOne({ where: { id } });

      if (!cuisine) {
        throw { name: "Not Found", message: "404 Data Not Found" };
      }

      const update = await Cuisine.update({ status }, { where: { id } });
      if (update[0] > 0) {
        log({
          title: cuisine.name,
          description: `Cuisine (${cuisine.name}) with id ${cuisine.id} has been updated from ${cuisine.status} to ${status}`,
          updatedBy: req.user.email,
        });
      }

      res.status(200).json({
        message: `Cuisine ${cuisine.name} with id ${cuisine.id} has been updated from ${cuisine.status} to ${status}`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async editProduct(req, res, next) {
    const { id } = req.params;
    const { name, description, imgUrl, price, categoryId, authorId, status } =
      req.body;
    try {
      const cuisine = await Cuisine.findOne({ where: { id } });
      if (!cuisine) {
        throw { name: "Not Found", message: "404 Data Not Found" };
      }
      const update = await Cuisine.update(
        { name, description, imgUrl, price, categoryId, authorId, status },
        { where: { id } }
      );

      if (update[0] > 0) {
        log({
          name,
          description: `Product with id ${id} updated`,
          updatedBy: req.username,
        });
        res.status(200).json({ message: `Product wiht id ${id} updated` });
      }
    } catch (error) {
      next(error.data);
    }
  }
  static async history(req, res, next) {
    try {
      const data = await History.findAll({ order: [["id", "ASC"]] });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Cuisiness;
//
