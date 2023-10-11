const mongoose = require("mongoose");
const Joi = require("joi");
const ComplexPass = require("joi-password-complexity");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.virtual("orders", {
  ref: "order",
  foreignField: "userId",
  localField: "_id",
});

const User = mongoose.model("User", UserSchema);

// Validate Register user
const validateRegistrationUser = (obj) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: ComplexPass().required(),
  });
  return schema.validate(obj);
};

// Validate Login user
const validateLoginUser = (obj) => {
  const schema = Joi.object({
    email: Joi.string(),
    password: Joi.string(),
  });
  return schema.validate(obj);
};

module.exports = { User, validateRegistrationUser, validateLoginUser };
