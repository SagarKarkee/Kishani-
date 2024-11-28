const mongoose = require('mongoose');

const purchaseRequestSchema = new mongoose.Schema({
  buyerEmail: { type: String, required: true },
  farmerEmail: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // Pending, Approved, Rejected
  requestDate: { type: Date, default: Date.now },
});

module.exports = purchaseRequestSchema;
