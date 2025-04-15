const Product = require('../models/Product');

const createProduct = async (req, res) => {
  const { productType, productName, imageUrl, location, price } = req.body;

  try {
    const newProduct = new Product({
      productType,
      productName,
      imageUrl,
      location,
      price
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getProductsByType = async (req, res) => {
    console.log("📦 getProductsByType controller called");
 
  const { type } = req.params;
  try {
    const products = await Product.find({
      productType: { $regex: new RegExp(`^${type}$`, 'i') }
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};
const createBulkProducts = async (req, res) => {
    try {
      const products = req.body;
      if (!Array.isArray(products)) {
        return res.status(400).json({ message: 'Data must be an array of products.' });
      }
  
      const insertedProducts = await Product.insertMany(products);
      res.status(201).json(insertedProducts);
    } catch (error) {
      console.error("Error in bulk creation:", error);
      res.status(500).json({ message: "Server error during bulk product creation." });
    }
  };
console.log("Routes are working");

module.exports = { getProductsByType, createProduct ,  createBulkProducts };