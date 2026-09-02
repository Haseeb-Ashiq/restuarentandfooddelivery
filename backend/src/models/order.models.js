const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  name: { type: String, required: true }, // Embedded name to preserve historical data
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  subtotal: { type: Number, required: true },
  specialInstructions: { type: String }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' }, // Null for takeaway/delivery
  orderType: { type: String, enum: ['dine-in', 'takeaway', 'delivery'], default: 'dine-in' },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true, default: 0 },
  status: { 
    type: String, 
    enum: ['pending', 'preparing', 'ready', 'served', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  cancelReason: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Staff who took the order
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);