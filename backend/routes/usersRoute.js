const router = require("express").Router();
const {
  getAllUsersCtrl,
  deleteUserCtrl,
  updateeUserCtrl,
} = require("../controllers/userCtrl");
const validateId = require("../middlewares/validateId");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// /api/users
router.route("/").get(verifyTokenAndAdmin, getAllUsersCtrl);
router
  .route("/:id")
  .delete(validateId, verifyTokenAndAdmin, deleteUserCtrl)
  .put(validateId, verifyTokenAndAdmin, updateeUserCtrl);

module.exports = router;
