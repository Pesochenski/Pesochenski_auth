const Router = require("express");
const authController = require("../controllers/authController");
const { check } = require("express-validator");

const router = new Router();

router.post(
  "/register",
  [check("name", "Sorrry, field name cannot be empty").notEmpty()],
  authController.register
);
router.post("/login", authController.login);
router.get("/users", authController.getUsers);

module.exports = router;
