const asyncHandler = require("express-async-handler");
const { Product, validateCreateProduct } = require("../models/Products");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadImages,
  cloudinaryDeleteImages,
} = require("../utils/cloudinary");

/**
 * @desc Create new product
 * @route /api/products
 * @method POST
 * @access private (only admin)
 */
exports.createProductCtrl = asyncHandler(async (req, res) => {
  // Validate;
  const { error } = validateCreateProduct(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  // Array for Images
  const images = [];
  const files = req.files;
  // Check he add image
  if (!files || files.length <= 0) {
    return res.status(404).json({ msg: "please add a file" });
  }
  // empty image array
  let imagePath = [];
  // Looping in images
  for (let i = 0; i < files.length; i++) {
    imagePath.push(path.join(__dirname, `../images/${files[i].filename}`));
    const result = await cloudinaryUploadImages(files[i].path);
    images.push({
      url: result.secure_url,
      publicId: result.public_id,
    });
  }
  // Create Product
  const product = await Product.create({
    title: req.body.title,
    desc: req.body.desc,
    categories: req.body.categories,
    images: images,
    color: req.body.color,
    size: req.body.size,
    price: req.body.price,
    stock: req.body.stock,
  });
  res.status(200).json(product);
  // remove image from server
  for (let i = 0; i < imagePath.length; i++) {
    fs.unlinkSync(imagePath[i]);
  }
});

/**
 * @desc get All Products
 * @route /api/products
 * @method GET
 * @access public
 */
exports.getAllProductsCtrl = asyncHandler(async (req, res) => {
  const { category, search } = req.query;

  let products;
  if (category) {
    products = await Product.find({ categories: { $in: category } });
  } else if (search) {
    products = await Product.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { desc: { $regex: search, $options: "i" } },
      ],
    });
  } else {
    products = await Product.find();
  }

  res.status(200).json(products);
});

/**
 * @desc get Product
 * @route /api/products/:id
 * @method GET
 * @access public
 */
exports.getProductCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  res.status(200).json(product);
});

/**
 * @desc Update Product
 * @route /api/products/:id
 * @method PUT
 * @access private (only admin)
 */
exports.updateProductCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }

  const updateProduct = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        title: req.body.title,
        desc: req.body.desc,
        categories: req.body.categories,
        color: req.body.color,
        size: req.body.size,
        price: req.body.price,
        stock: req.body.stock,
      },
    },
    { new: true }
  );
  res.status(200).json(updateProduct);
});

/**
 * @desc Update images Product
 * @route /api/products/product-image/:id
 * @method PUT
 * @access private (only admin)
 */
exports.updateProductImageCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }

  // Array for Images
  const images = [];
  // empty image array
  let imagePath = [];
  const files = req.files;

  if (!files || files.length <= 0) {
    return res.status(404).json({ msg: "please add file" });
  }
  // Delete images from cloudinary
  product.images.map((image) => cloudinaryDeleteImages(image.publicId));
  // Looping in images;
  for (let i = 0; i < files.length; i++) {
    imagePath.push(path.join(__dirname, `../images/${files[i].filename}`));
    const result = await cloudinaryUploadImages(files[i].path);
    images.push({
      url: result.secure_url,
      publicId: result.public_id,
    });
  }
  const updateProductImage = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        images: images,
      },
    },
    { new: true }
  );
  res.status(200).json(updateProductImage);
  // remove image from server
  for (let i = 0; i < imagePath.length; i++) {
    fs.unlinkSync(imagePath[i]);
  }
});

/**
 * @desc Delete Product Product
 * @route /api/products/:id
 * @method DELETE
 * @access private (only admin)
 */
exports.deleteProductCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  // remove product images from cloudinary
  product.images.map((image) => cloudinaryDeleteImages(image.publicId));

  // // Delete product
  await Product.findByIdAndDelete(id);
  return res.status(200).json({ msg: "Delete product successfully" });
});
