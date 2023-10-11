const {
  resetPassLinkCtrl,
  getPassLinkCtrl,
  resetPassCtrl,
} = require("../controllers/passwordCtrl");

const router = require("express").Router();

// /api/password/reset-password-link
router.route("/reset-password-link").post(resetPassLinkCtrl);
// /api/password/reset-password-link/:userId/:tokenId
router
  .route("/reset-password-link/:userId/:tokenId")
  .get(getPassLinkCtrl)
  .post(resetPassCtrl);

module.exports = router;
