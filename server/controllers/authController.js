const Role = require("../models/Role");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { key } = require("../config");

function createAccessToken(_id, roles) {
  const payload = {
    _id,
    roles,
  };
  const token = jwt.sign(payload, key, { expiresIn: "12h" });
  return token;
}

class Controller {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ message: errors });
      }
      const { name, password, email } = req.body;

      const candidateName = await User.findOne({ name });
      const candidateEmail = await User.findOne({ email });

      if (candidateName) {
        return res
          .status(400)
          .json({ message: "Sorry, user with such name already exists" });
      }
      if (candidateEmail) {
        return res
          .status(400)
          .json({ message: "Sorry, user with such Email already exists" });
      }

      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({ value: "User" });

      const user = new User({
        name,
        password: hashPassword,
        email,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({
        message: "You was successfully registred, login please",
      });
    } catch (err) {
      console.log(err);
      return req.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { name, password } = req.body;
      const userFind = await User.findOne({ name });
      if (!userFind) {
        return res.status(400).json({ message: "Sorry, user nor found" });
      }
      const validPassword = bcrypt.compareSync(password, userFind.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Sorry, wrong password" });
      }

      const jwt = createAccessToken(userFind._id, userFind.roles);
      return res.json({ jwt });
    } catch (err) {
      console.log(err);
      return req.status(400).json({ message: "Login error" });
    }
  }

  async getUsers(req, res) {
    try {
      const siteUsers = User.find();
      return res.json({ siteUsers });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new Controller();
