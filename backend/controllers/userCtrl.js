const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");

/**
 * @desc Get All Users
 * @route /api/users
 * @method GET
 * @access private (only admin)
 */
exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

/**
 * @desc Update User
 * @route /api/users/:id
 * @method PUT
 * @access private (only admin)
 */
exports.updateeUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  if (req.user._id === user._id.toString()) {
    return res.status(403).json({ msg: "You can't Update yourself" });
  }
  //  Update User
  await User.findByIdAndUpdate(
    id,
    {
      $set: {
        isAdmin: req.body.isAdmin,
      },
    },
    { new: true }
  );
  const users = await User.find();
  res.status(200).json(users);
});

/**
 * @desc Delete User
 * @route /api/users/:id
 * @method Delete
 * @access private (only admin)
 */
exports.deleteUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  if (req.user._id === user._id.toString()) {
    return res.status(403).json({ msg: "You can't delete yourself" });
  }
  await User.findByIdAndDelete(id);
  res.status(200).json({ msg: "Deleted successfully", user });
});
