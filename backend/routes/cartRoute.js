const { cartCtrl } = require("../controllers/cartCtrl");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

router.route("/").post(verifyToken, cartCtrl);

module.exports = router;
