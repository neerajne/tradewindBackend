const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    match:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*&?])[A-Za-z\d@$!%*&?]{8,}$/,
  },
});

userSchema.methods.matchPassword = async function (
  enteredPassword,
  existingUserPassowrd
) {
  return bcrypt.compare(enteredPassword, existingUserPassowrd);
};
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return console.log("returned from generating salt", err);
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return console.log("returned from hashing password", err);
      }
      user.password = hash;
      console.log(hash);
      next();
      console.log("hashed successfully while saving the user");
    });
  });
});
module.exports = userSchema;
