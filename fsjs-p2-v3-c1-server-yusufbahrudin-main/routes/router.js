const express = require("express");
const { authentication } = require("../middlewares/authentication");
const {
  authorization,
  authorizationStatus,
} = require("../middlewares/authorization");

const router = express.Router();
const { Auth, Cuisine, Public } = require("../controllers");
const { customer } = require("./customer");

router.use("/public", customer);

router.get("/", (req, res) => res.send("Project 1 !"));
router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.post("/login/google", Auth.google);

router.use(authentication);
router.post("/cuisines", Cuisine.createCuisine);
router.get("/cuisines", Cuisine.getAllCuisine);
router.get("/cuisines/:id", Cuisine.getCuisineById);
router.get("/categories", Cuisine.getAllCategories);
router.delete("/cuisines/:id", authorization, Cuisine.deleteCuisineById);
router.put("/cuisines/:id", authorization, Cuisine.editProduct);
router.patch(
  "/cuisines/:id/:status",
  authorizationStatus,
  Cuisine.CuisineStatus
);
router.get("/history", Cuisine.history);

module.exports = router;
