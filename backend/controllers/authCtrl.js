const asyncHandler = require("express-async-handler");
const {
  User,
  validateRegistrationUser,
  validateLoginUser,
} = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @desc Create new User
 * @route /api/auth/register
 * @method POST
 * @access public
 */
exports.registerUserCtrl = asyncHandler(async (req, res) => {
  // Validate
  const { error } = validateRegistrationUser(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  // check if user is already exist
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: "user already exists" });
  }
  // Hashed Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // Create User
  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  res
    .status(201)
    .json({ msg: "you 're registered successfully, Please login" });
});

/**
 * @desc Login User
 * @route /api/auth/login
 * @method POST
 * @access public
 */
exports.loginUserCtrl = asyncHandler(async (req, res) => {
  // Validate
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  // check if email and password are valid
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({ msg: "email or password is wrong" });
  }
  // generate token
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_KEY
  );
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  });
});
