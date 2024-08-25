const generateToken = require("../config/generateToken");
const validatePassword = require("../config/passwordErrorCheck");
const User = require("../model/userModel");

const signUpController = async (req, res) => {
  try {
    console.log("hi");
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send("either email or password is missing !");
    }
   const passwordErrors =  validatePassword(password);
     if (passwordErrors.length > 0) {
       return res
         .status(400)
         .send({
           message: "Password validation failed",
           errors: passwordErrors,
         });
     }
    console.log("user signing with", email, password);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).send("user already exists");
    }
    const newUser = await User.create({ email: email, password: password });
    res.status(200).send({
      _id: newUser._id,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send("either email or password missing !");
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(404).send("user not found in database");
  }
  const verified = await existingUser.matchPassword(
    password,
    existingUser.password
  );
  if (!verified) {
    return res.status(400).send("password doesnt match");
  }
  res.status(200).json({
    id: existingUser._id,
    email: existingUser.email,
    token: generateToken(existingUser._id),
  });
};
module.exports = { signUpController, loginController };
