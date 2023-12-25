const { authenticationBookmark } = require("../middlewares/authentication");
const { authorizationBookmark } = require("../middlewares/authorization");

const express = require("express");
const customer = express.Router();

const { Auth, Cuisine, Public } = require("../controllers");

customer.get("/", (req, res) =>
  res.status(200).json({ message: "week3 vue !" })
);

customer.post("/login", Public.login);
customer.post("/register", Public.register);
customer.get("/cuisines", Public.cuisineAll);
customer.get("public/cuisines/:id", Public.cuisineDetail);
customer.get("/bookmark", authenticationBookmark, Public.getBookmark);
customer.post(
  "/bookmark/:CuisineId",
  authenticationBookmark,
  authorizationBookmark,
  Public.addBookmark
);

module.exports = { customer };
