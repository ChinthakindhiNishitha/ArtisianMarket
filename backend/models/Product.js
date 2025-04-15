const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  artisan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productType: String,
  productName: String,
  imageUrl: String,
  location: String,
  price: Number
});

module.exports = mongoose.model('Product', productSchema);
