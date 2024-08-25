const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  const payload = {
    _id: id,
  };
  const secretKey = process.env.SECRET;
  const options = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, secretKey, options);
  console.log(`ur token is ${token}`);
  return token;
};

module.exports = generateToken;
