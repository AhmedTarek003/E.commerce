const asynchandler = require("express-async-handler");
const Order = require("../models/Order");
const { Product } = require("../models/Products");
const Cart = require("../models/Cart");

/**
 * @desc Create Order
 * @route /api/orders
 * @method POST
 * @access private (only logged in)
 */
exports.createOrderCtrl = asynchandler(async (req, res) => {
  // get order from cart
  const orderItems = await Cart.findById(req.body.orderItems);
  // Check if cart exists
  if (!orderItems) {
    return res.status(404).json({ msg: "this cart not found" });
  }
  // maping on product in cart
  const orderItemsIds = Promise.all(
    orderItems.products.map(async (orderItem) => orderItem.productId.toString())
  );
  const orderItemsIdsResolved = await orderItemsIds;

  // get Price
  const totalPricesArr = await Promise.all(
    orderItems.products.map(async (orderItemId) => {
      const orderItem = await Product.findById(orderItemId.productId);

      // Update stock product
      await Product.findByIdAndUpdate(
        orderItemId.productId,
        {
          $set: {
            stock: orderItem.stock - orderItemId.quantity,
          },
        },
        { new: true }
      );
      const totalPrice = orderItem.price * orderItemId.quantity;
      return totalPrice;
    })
  );

  // get Size
  const sizeOrder = await Promise.all(
    orderItems.products.map((product) => product.size)
  );
  // get Color
  const colorOrder = await Promise.all(
    orderItems.products.map((product) => product.color)
  );

  // Total price
  const totalPrice = totalPricesArr.reduce((a, b) => a + b, 0);
  // create Order
  const orderList = await Order.create({
    userId: req.user._id,
    orderItems: orderItemsIdsResolved,
    totalPrice: totalPrice,
    color: colorOrder,
    size: sizeOrder,
    images: orderItems.images,
    country: req.body.country,
    address: req.body.address,
    status: req.body.status,
  });

  // remove order form cart
  await Cart.findByIdAndDelete(req.body.orderItems);
  res.status(201).json(orderList);
});

/**
 * @desc Get All Orders
 * @route /api/orders
 * @method GET
 * @access private (only admin)
 */
exports.getAllOrdersCtrl = asynchandler(async (req, res) => {
  const orders = await Order.find()
    .sort("-createdAt")
    .populate("user", ["-password"]);
  res.status(200).json(orders);
});

/**
 * @desc Update Order
 * @route /api/orders/:id
 * @method PUT
 * @access private (only admin)
 */
exports.updateOrderCtrl = asynchandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ msg: "Order not found" });
  }
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      $set: {
        status: req.body.status,
      },
    },
    { new: true }
  );
  res.status(200).json(updatedOrder);
});

/**
 * @desc Delete Order
 * @route /api/orders/:id
 * @method DELETE
 * @access private (only admin)
 */
exports.deleteOrderCtrl = asynchandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ msg: "Order not found" });
  }
  // Delete order form cart
  await Cart.findByIdAndDelete(order.cartId.toString());
  // Delete order form OrderList
  await Order.findByIdAndDelete(id);
  res.status(200).json({ msg: "Deleted from OrderLis and cart" });
});

/**
 * @desc Get Income per month
 * @route /api/orders/income
 * @method GET
 * @access private (only admin)
 */
exports.getIncomeCtrl = asynchandler(async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

  const income = await Order.aggregate([
    { $match: { createdAt: { $gte: previousMonth } } },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$totalPrice",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ]);

  res.status(200).json(income);
});
