var mongoose = require("mongoose")
var employer = new mongoose.Schema({
  name: { type: String, required: true },
  nickname: String,
  district: String,
  contact1: {
    name: String, phone: String
  },
  contact2: {
    name: String, phone: String
  },
  hkid: String,
  avaliable: { type: Boolean, default: true },
  removed: { type: Boolean, default: false },
  refer: String,
  wechat: String,
  invoices: [{type: mongoose.Schema.Types.ObjectId, ref: "invoice"}]
})

module.exports = mongoose.model("client", employer)
