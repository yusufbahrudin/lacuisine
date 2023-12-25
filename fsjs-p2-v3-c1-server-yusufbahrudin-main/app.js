if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { errorHandler } = require("./middlewares/errorHandler");
const express = require("express");
const router = require("./routes/router");

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = { app };
