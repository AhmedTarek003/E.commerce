const asncHandler = require("express-async-handler");
const Cart = require("../models/Cart");
const { Product } = require("../models/Products");

exports.cartCtrl = asncHandler(async (req, res) => {
  const products = req.body.products;

  // Check if cart more than stock
  const pro = await Promise.all(
    products.map(async (product) => {
      const stockofproduct = await Product.findById(product.productId);
      if (stockofproduct.stock - product.quantity < 0) {
        throw new Error(
          `${stockofproduct.title} is Out of stock, if you want continue please remove this item from cart or less the quantity`
        );
      }
      const productImage = stockofproduct.images[0];
      return productImage;
    })
  );
  const cart = await Cart.create({
    UserId: req.user._id,
    products: req.body.products,
    images: pro,
  });
  res.status(200).json(cart);
});
