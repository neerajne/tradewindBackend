const { model } = require("mongoose");
const userSchema = require("../schema/userSchema");
const User = new model("User", userSchema);
module.exports = User;
