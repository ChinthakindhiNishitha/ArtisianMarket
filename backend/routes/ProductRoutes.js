

const express = require('express');
const router = express.Router();
const { getProductsByType, createProduct,createBulkProducts } = require('../controllers/productController');
const Product = require('../models/Product'); // Import the Product model

console.log("✅ ProductRoutes loaded");

// GET products by type
router.get('/:type', getProductsByType);

// POST single product
router.post('/', createProduct);

// ✅ POST multiple products (bulk insert)
router.post('/bulk', createBulkProducts);

module.exports = router;
