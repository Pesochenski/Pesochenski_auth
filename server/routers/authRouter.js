const Router = require("express");
const authController = require("../controllers/authController");
const { check } = require("express-validator");
// const authMiddleWare = require("../middleware/authMiddleWare");
const roleMiddleWare = require("../middleware/roleMiddleWare");

const router = new Router();

router.post(
  "/register",
  [check("name", "Sorrry, field name cannot be empty").notEmpty()],
  authController.register
);
router.post("/login", authController.login);
router.get("/users", roleMiddleWare(["Admin"]), authController.getUsers); // That's why access to users list have only admins

module.exports = router;
