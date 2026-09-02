const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  subtotal: { type: Number, required: true },
  taxRatePercent: { type: Number, default: 10 }, // Tax percentage
  taxAmount: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paymentMethod: { 
    type: String, 
    enum: ['cash', 'card', 'online', 'unpaid'], 
    default: 'unpaid' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'refunded', 'failed'], 
    default: 'pending' 
  },
  paidAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Billing', billingSchema);