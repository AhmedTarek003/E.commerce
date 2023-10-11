const asyncHandler = require("express-async-handler");
const Verification = require("../models/Verification");
const { User } = require("../models/User");
const Crypto = require("crypto");
const sendMaile = require("../utils/sendMail");
const bcrypt = require("bcryptjs");

/**
 * @desc send reset password Link
 * @route /api/password/reset-password-link
 * @method POST
 * @access public
 */
exports.resetPassLinkCtrl = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  let verification = await Verification.findOne({ userId: user._id });
  if (!verification) {
    verification = await Verification.create({
      userId: user._id,
      token: Crypto.randomBytes(32).toString("hex"),
    });
  }
  // create Link
  const link = `${process.env.URL}/reset-password/${user._id}/${verification.token}`;
  // create html template
  const htmlTemp = `<a href=${link}>Click here to reset your password</a>`;
  // send email
  await sendMaile(user.email, "reset-password", htmlTemp);
  // response to client
  res.status(200).json({
    msg: "Password reset link sent to your email, Please check you inpox",
  });
});

/**
 * @desc get reset password link
 * @route /api/password/reset-password-link/:userId/:tokenId
 * @method GET
 * @access public
 */
exports.getPassLinkCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ msg: "invalid Link" });
  }
  const verification = await Verification.findOne({
    userId: user._id,
    token: req.params.tokenId,
  });
  if (!verification) {
    return res.status(404).json({ msg: "invalid Link" });
  }
  res.status(200).json({ msg: "vaild link" });
});
/**
 * @desc  reset password
 * @route /api/password/reset-password-link/:userId/:tokenId
 * @method POST
 * @access public
 */
exports.resetPassCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ msg: "invalid Link" });
  }
  const verification = await Verification.findOne({
    userId: user._id,
    token: req.params.tokenId,
  });
  if (!verification) {
    return res.status(404).json({ msg: "invalid Link" });
  }
  if (!user.isVerified) {
    user.isVerified = true;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // change password
  user.password = hashedPassword;
  await user.save();
  // delete verification token
  await Verification.deleteOne();
  res.status(200).json({ msg: "password reset successfully, please login" });
});
