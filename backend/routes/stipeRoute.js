const { paymentCtrl } = require("../controllers/stripeCtrl");

const router = require("express").Router();

router.route("/payment").post(paymentCtrl);

module.exports = router;
