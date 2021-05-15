const jwt = require("jsonwebtoken");
const { key } = require("../config");

module.exports = (roles) => {
  return (res, req, next) => {
    if (req.method == "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(403).json({ message: "Sorry, user is not authorized" });
      }

      const { roles: decodeUserRoles } = jwt.verify(token, key);
      let hasRole = false; // with commented if (!hasRole) eslint write "hasRole is assigned but never used"

      decodeUserRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        res.status(403).json({ message: "Sorry, access is denied" });
      }
      next();
    } catch (err) {
      res.status(403).json({ message: "Sorry, user is not authorized" });
    }
  };
};
