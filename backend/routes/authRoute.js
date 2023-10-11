const rotuer = require("express").Router();
const { registerUserCtrl, loginUserCtrl } = require("../controllers/authCtrl");

// /api/auth/register
rotuer.route("/register").post(registerUserCtrl);
rotuer.route("/login").post(loginUserCtrl);

module.exports = rotuer;
