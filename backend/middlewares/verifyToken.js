const jwt = require("jsonwebtoken");

// verify Token
const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
      } catch {
        return res.status(400).json({ msg: "Invalid token" });
      }
    } else {
      return res.status(404).json({ msg: "No token provided" });
    }
  } else {
    return res.status(404).json({ msg: "No authorization provided" });
  }
};

// verify Token and Admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ msg: "You are not allowed" });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAdmin };
