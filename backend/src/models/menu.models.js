const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  images: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  preparationTimeMinutes: { type: Number, default: 15 }
}, { timestamps: true });

menuItemSchema.index({ name: 'text', description: 'text' }); // For fast menu search

module.exports = mongoose.model('MenuItem', menuItemSchema);