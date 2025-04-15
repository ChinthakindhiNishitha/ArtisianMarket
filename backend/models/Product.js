// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productType: { type: String, required: true },
  productName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  artisan: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // reference to artisan
});

module.exports = mongoose.model('Product', productSchema);
