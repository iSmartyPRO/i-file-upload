const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  lName: String,
  fName: String,
  position: String,
  email: String,
  password: String,
  avatar: String
})

module.exports = mongoose.model("User", userSchema)