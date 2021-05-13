const { Schema, model } = require("mongoose");

const Role = new Schema({
  role: { type: String, unique: true, default: "User" },
});

module.exports = model("Role", Role);
