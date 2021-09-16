const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    // unique: true -> Ideally, should be unique, but its up to you
  },
  password: String,

  role: {
    type: String,
    enum: ["user", "admin", "host"],
    default: "user"
  },

  email: String

});

const User = model("User", userSchema);
//this is user model

module.exports = User;
