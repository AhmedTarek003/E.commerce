const router = require("express").Router();
const {
  createOrderCtrl,
  getAllOrdersCtrl,
  deleteOrderCtrl,
  updateOrderCtrl,
  getIncomeCtrl,
} = require("../controllers/orderCtrl");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const validateId = require("../middlewares/validateId");

// /api/orders
router
  .route("/")
  .post(verifyToken, createOrderCtrl)
  .get(verifyTokenAndAdmin, getAllOrdersCtrl);

// /api/orders/income
router.route("/income").get(verifyTokenAndAdmin, getIncomeCtrl);

// /api/orders/:id
router
  .route("/:id")
  .delete(validateId, verifyTokenAndAdmin, deleteOrderCtrl)
  .put(validateId, verifyTokenAndAdmin, updateOrderCtrl);
module.exports = router;
