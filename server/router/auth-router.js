const AuthController = require("../controllers/auth-controller");
const Authentication = require("../middlewares/authentication");
const router = require("express").Router();

router.get("/", AuthController.getSongs);

module.exports = router;
