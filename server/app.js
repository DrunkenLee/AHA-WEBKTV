if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const ErrorHandler = require("./middlewares/error-handler");
const authRouter = require("./router/auth-router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);

app.use(ErrorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
