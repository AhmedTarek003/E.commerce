const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    color: [],
    images: [],
    size: [],
    country: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

OrderSchema.virtual("user", {
  ref: "User",
  foreignField: "_id",
  localField: "userId",
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
