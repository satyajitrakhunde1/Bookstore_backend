// models/Checkout.js
const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  checkedOutAt: { type: Date, default: Date.now },
});

const Checkout = mongoose.model('Checkout', checkoutSchema);
module.exports = Checkout;
