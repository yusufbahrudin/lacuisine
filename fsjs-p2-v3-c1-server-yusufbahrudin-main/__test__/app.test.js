const { app } = require("../app");
const { sequelize } = require("../models/index");
const { hash } = require("../helpers/hash");
const request = require("supertest");
// const { describe, expect, test, it } = require("@jest/globals");

beforeAll(async () => {
  const users = require("../data/users.json").map((user) => {
    user.createdAt = new Date();
    user.updatedAt = new Date();
    user.password = hash(user.password);
    return user;
  });

  const categories = require("../data/categories.json").map((category) => {
    category.createdAt = new Date();
    category.updatedAt = new Date();
    return category;
  });

  const cuisines = require("../data/cuisines.json").map((cuisine) => {
    cuisine.createdAt = new Date();
    cuisine.updatedAt = new Date();
    return cuisine;
  });

  const pubUsers = require("../data/pubuser.json").map((pubUser) => {
    pubUser.createdAt = new Date();
    pubUser.updatedAt = new Date();
    return pubUser;
  });

  await sequelize.queryInterface.bulkInsert("Users", users);
  await sequelize.queryInterface.bulkInsert("Categories", categories);
  await sequelize.queryInterface.bulkInsert("Cuisines", cuisines);
  await sequelize.queryInterface.bulkInsert("PubUsers", pubUsers);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });

  await sequelize.queryInterface.bulkDelete("Categories", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });

  await sequelize.queryInterface.bulkDelete("Cuisines", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });

  await sequelize.queryInterface.bulkDelete("PubUsers", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});

describe("# Register Customer, need to check the status and response when", () => {
  test("[ ] Successfully registered (customer role)", async () => {
    const body = {
      email: "testi@gmail.com",
      password: "12345",
      role: "customer",
    };
    const response = await request(app).post("/public/register").send(body);
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("role", expect.any(String));
    expect(response.body).toHaveProperty("email", expect.any(String));
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  test("[ ] Email not provided / not entered", async () => {
    const body = { password: "12345" };
    const response = await request(app).post("/public/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required !");
  });

  test("[ ] Password not provided / not entered", async () => {
    const body = { email: "test@gmail.com" };
    const response = await request(app).post("/public/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required !");
  });

  test("[ ] Email is given an empty string", async () => {
    const body = { email: "", password: "12345" };
    const response = await request(app).post("/public/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required !");
  });

  test("[ ] Password is given as an empty string", async () => {
    const body = { email: "test@gmail.com", password: "" };
    const response = await request(app).post("/public/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required !");
  });

  test("[ ] Email format is incorrect / invalid", async () => {
    const body = {
      email: "testu.com",
      password: "hahahehe",
    };
    const response = await request(app).post("/public/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid email !");
  });

  test("[ ] Email has been registered", async () => {
    const body = {
      email: "test@gmail.com",
      password: "12345",
    };
    const response = await request(app).post("/public/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Email already register !");
  });
});

describe("Customer Login, need to check the status and response when", () => {
  test("[ ] Successfully logged in to customer role", async () => {
    const body = {
      email: "testi@gmail.com",
      password: "12345",
    };
    const response = await request(app).post("/public/login").send(body);

    access_token = response.body.access_token;

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("role", expect.any(String));
    expect(response.body).toHaveProperty("email", expect.any(String));
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  test("[ ] Provided wrong password", async () => {
    const body = {
      email: "test@gmail.com",
      password: "passwordSALAH",
    };
    const response = await request(app).post("/public/login").send(body);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password !"
    );
  });

  test("[ ] The email entered is not registered in the database", async () => {
    const body = {
      email: "testSALAH@gmail.com",
      password: "12345SALAH",
    };
    const response = await request(app).post("/public/login").send(body);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password !"
    );
  });
});

describe("# GET Entity", () => {
  test("[ ] Successfully got Primary Entity (without access_token) without using parameter filter query", async () => {
    const response = await request(app).get("/public/cuisines");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.data[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body.data[0]).toHaveProperty("name", expect.any(String));
    expect(response.body.data[0]).toHaveProperty(
      "description",
      expect.any(String)
    );
    expect(response.body.data[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body.data[0]).toHaveProperty(
      "categoryId",
      expect.any(Number)
    );
    expect(response.body.data[0]).toHaveProperty(
      "authorId",
      expect.any(Number)
    );
    expect(response.body.data[0]).toHaveProperty("status", expect.any(String));
  });

  test("[ ] Successfully got Primary Entity (without access_token) with 1 parameter filter query", async () => {
    const response = await request(app).get("/public/cuisines?search=ayam");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.data[0]).toHaveProperty("id", expect.any(Number));
    expect(response.body.data[0]).toHaveProperty("name", expect.any(String));
    expect(response.body.data[0]).toHaveProperty(
      "description",
      expect.any(String)
    );
    expect(response.body.data[0]).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body.data[0]).toHaveProperty(
      "categoryId",
      expect.any(Number)
    );
    expect(response.body.data[0]).toHaveProperty(
      "authorId",
      expect.any(Number)
    );
    expect(response.body.data[0]).toHaveProperty("status", expect.any(String));
  });

  test("[ ] Failed to get Main Entity because the given id params does not exist in the database / is invalid", async () => {
    const response = await request(app).get("/public/cuisines/100");
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "404 Data Not Found");
  });
});

describe("# Bookmark", () => {
  test("[ ] Successfully added a bookmark with the appropriate id", async () => {
    const response = await request(app)
      .post("/public/bookmark/1")
      .set("access_token", access_token);
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("PubUserId", expect.any(Number));
    expect(response.body).toHaveProperty("CuisineId", expect.any(Number));
  });

  test("[ ] Failed to add a bookmark because the entity id sent does not exist in the database", async () => {
    const response = await request(app)
      .post("/public/bookmark/10000")
      .set("access_token", access_token);
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "Cuisine not found");
  });

  test("[ ] Successfully got the bookmarks / favorites list according to the logged in user", async () => {
    const response = await request(app)
      .get("/public/bookmark")
      .set("access_token", access_token);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("PubUserId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("CuisineId", expect.any(Number));
  });

  test("[ ] Failed to get bookmarks / favorites list because not logged in", async () => {
    const response = await request(app).get("/public/bookmark");
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("[ ] Failed to get the bookmark / favorite list because the token provided was invalid (random string)", async () => {
    const response = await request(app)
      .post("/public/bookmark/2")
      .set("access_token", "abc");
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });
});
