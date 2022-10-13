const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: "",
    userName: "",
    email: "",
    password: "",
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
