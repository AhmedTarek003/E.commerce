const router = require("express").Router();
const {
  createProductCtrl,
  getAllProductsCtrl,
  getProductCtrl,
  updateProductCtrl,
  updateProductImageCtrl,
  deleteProductCtrl,
} = require("../controllers/productCtrl");
const uploadImage = require("../middlewares/uploadImage");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const validateId = require("../middlewares/validateId");

// /api/products
router
  .route("/")
  .post(verifyTokenAndAdmin, uploadImage.array("image", 3), createProductCtrl)
  .get(getAllProductsCtrl);

// /api/products/product-image/:id
router
  .route("/product-image/:id")
  .put(
    validateId,
    verifyTokenAndAdmin,
    uploadImage.array("image", 3),
    updateProductImageCtrl
  );

// /api/products/:id
router
  .route("/:id")
  .get(validateId, getProductCtrl)
  .put(validateId, verifyTokenAndAdmin, updateProductCtrl)
  .delete(validateId, verifyTokenAndAdmin, deleteProductCtrl);

module.exports = router;
