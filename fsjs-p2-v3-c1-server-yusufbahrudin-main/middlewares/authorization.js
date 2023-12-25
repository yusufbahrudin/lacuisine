const { User, Cuisine, Category, Bookmark } = require("../models");

const authorization = async (req, res, next) => {
  try {
    // console.log("nyampe authoriasation");
    // console.log(req.user);
    let userId = req.user.id;

    // console.log(Cuisines, "<<<<<<<    ninnnnini");
    let Cuisines = await Cuisine.findByPk(req.params.id);
    if (!Cuisines) {
      throw { status: 404, msg: "Cuisine not found" };
    }
    if (userId !== Cuisines.authorId || req.user.role !== "admin") {
      console.log(Cuisines);
      // console.log(req.user.id, "<<<<<<< nin user");
      // console.log("ini di kondisional if");
      // console.log(Cuisines.authorId, "<<< auth id");
      // console.log(userId, "<<< user");
      // console.log(req.user.role, "<<<< role");
      throw { status: 404, msg: "Forbidden" };
    }
    next();
  } catch (error) {
    // console.log(error, "eror di auth");
    next(error);
  }
};

const authorizationStatus = async (req, res, next) => {
  try {
    const cuis = await Cuisine.findByPk(req, params.id);

    if (!cuis) {
      throw { name: "Not Found", message: "Cuisine not found" };
    }
    if (req.user.role === "admin") {
      next();
    } else {
      throw { name: "Forbidden", message: "Access Forbidden" };
    }
  } catch (err) {
    next(err);
  }
};

const authorizationBookmark = async (req, res, next) => {
  try {
    const cuisine = await Cuisine.findByPk(req.params.CuisineId);

    if (!cuisine) {
      throw { name: "Not Found", message: "Cuisine not found" };
    }
    if (req.user.role === "customer") {
      next();
    } else {
      throw { name: "Forbidden", message: "Access Forbidden" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authorization,
  authorizationStatus,
  authorizationBookmark,
};
