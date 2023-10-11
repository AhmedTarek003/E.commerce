const Joi = require("joi");
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          default: null,
        },
      },
    ],
    color: {
      type: Array,
      required: true,
    },
    size: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
      minlength: 0,
      maxlength: 300,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

// Validate To Create Product
const validateCreateProduct = (obj) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    categories: Joi.array().required(),
    color: Joi.array().required(),
    size: Joi.array().required(),
    price: Joi.number().required(),
    rating: Joi.number(),
    stock: Joi.number().min(0).max(300).required(),
  });
  return schema.validate(obj);
};

module.exports = { Product, validateCreateProduct };
