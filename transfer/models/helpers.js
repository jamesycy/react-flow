var mongoose = require("mongoose")

var Photos = {
  public_id: String,
  url: String,
  secure_url: String
}

var helper = new mongoose.Schema({
  op: String,
  name: { type: String, required: true },
  nation: { type: String, enum: ["Indonesia", "Philippines"], required: true },
  email: String,
  phone: String,
  invoices: [{type: mongoose.Schema.Types.ObjectId, ref: "invoice"}],
  avaliable: { type: Boolean, default: true },
  hold: { type: Boolean, default: false },
  pinned: { type: Boolean, default: false },
  removed: { type: Boolean, default: false },
  hold: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now() },
  refer: String,
  type: [{type: String, enum: ['baby', 'kids', 'elderly', 'pets', 'cooking']}],
  age: Number,
  data_fee: Number,
  experience: String,
  photos: Photos,
  starlink: Photos,
  limastar: Photos,
})

module.exports = mongoose.model("helper", helper)
