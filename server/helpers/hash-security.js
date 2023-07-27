if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function hashing(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function generateToken(payload) {
  const SECRET_TOKEN = process.env.JWT_SECRET;
  return jwt.sign(payload, SECRET_TOKEN);
}

module.exports = { hashing, generateToken };
