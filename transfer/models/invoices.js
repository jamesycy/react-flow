var mongoose = require("mongoose")

var Remark = {
  content: String,
  author: String,
  notification: String,
  pinned: { type: Boolean, default: false }
}

var invoice = new mongoose.Schema({
  client: {type: mongoose.Schema.Types.ObjectId, ref: 'client'},
  helper: {type: mongoose.Schema.Types.ObjectId, ref: 'helper'},

  invoice_no: { type: String, required: true },
  type: { type: String },
  price: Number,
  sales: { type: String, enum: ['Rita', 'Wing', 'Siu', '公司', 'Phoebe'] },

  client_remark: [Remark],
  helper_remark: [Remark],

  employment_contract_no: String,
  sign_contract: String,
  consulate: String,
  immigration: String,
  get_visa: String,
  visa_end: String,
  isIncomplete: Boolean,
  arrival: String,
  end_date: String,
  end_type: { type: String, enum: ['Terminate', 'Finished', 'Change Helper', 'Cancelled'] },
  no_invoice: { type: String },

  created_at: { type: Date, default: Date.now() }

})

module.exports = mongoose.model("invoice", invoice)
