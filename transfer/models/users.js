var mongoose = require("mongoose")
var bcrypt = require("bcrypt")
var user = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: String,
  group: { type: String, enum: ['admin', 'document', 'sales', 'rita'] },
  created_at: { type: Date, default: Date.now() }
})

user.methods.generatePassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

user.methods.comparePassword = function(password, original) {
  return bcrypt.compareSync(password, original)
}

module.exports = mongoose.model("user", user)
