const { verifyToken } = require("../helpers/token");
const { User, Cuisine, Category, PubUser } = require("../models");

const authentication = async (req, res, next) => {
  try {
    // console.log(req.headers, "iin headres");
    const { access_token } = req.headers;
    if (!access_token) throw { name: "Unauthorized", message: "Invalid Token" };
    // console.log(access_token, "<<<< acces di auth ");
    const payload = verifyToken(access_token);
    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "Unauthorized", msg: "Invalid token" };
    req.user = { id: user.id, role: user.role, email: user.email };
    next();
  } catch (error) {
    next(error);
  }
};
const authenticationBookmark = async (req, res, next) => {
  try {
    // console.log(req.headers, "iin headres");
    const { access_token } = req.headers;
    if (!access_token) throw { name: "Unauthorized", message: "Invalid Token" };
    // console.log(access_token, "<<<< acces di auth ");
    const payload = verifyToken(access_token);
    const user = await PubUser.findByPk(payload.id);
    if (!user) throw { name: "Unauthorized", msg: "Invalid token" };
    req.user = { id: user.id, role: user.role, email: user.email };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication, authenticationBookmark };
