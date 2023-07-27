const { User } = require("../models");
const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

async function Authentication(req, res, next) {
  try {
    let { id } = jwt.verify(req.headers.access_token, process.env.JWT_SECRET);
    let user = await User.findByPk(id);
    if (!user) throw { name: "Unauthenticated" };
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    next();
  } catch (error) {
    if (error.name === "Unauthenticated") {
      res.status(401).json({ message: "Unauthenticated" });
    } else if (error.name == "JsonWebTokenError") {
      console.log(error);
      res.status(401).json({ message: "Unauthenticated" });
    } else {
      console.log("masuk ke authentication");
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = Authentication;
