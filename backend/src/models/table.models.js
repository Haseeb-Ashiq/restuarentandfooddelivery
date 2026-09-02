const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: { type: String, required: true, unique: true, trim: true },
  capacity: { type: Number, required: true, min: 1 },
  status: { 
    type: String, 
    enum: ['available', 'occupied', 'reserved', 'out_of_service'], 
    default: 'available' 
  },
  currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
}, { timestamps: true });

module.exports = mongoose.model('Table', tableSchema);