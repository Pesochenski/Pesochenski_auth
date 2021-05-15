const jwt = require("jsonwebtoken");
const { key } = require("../config");

module.exports = (req, res, next) => {
  if (req.method == "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(403).json({ message: "Sorry, user is not authorized" });
    }

    const decode = jwt.verify(token, key);
    req.decodedUser = decode;
    next();
  } catch (err) {
    res.status(403).json({ message: "Sorry, user is not authorized" });
  }
};
