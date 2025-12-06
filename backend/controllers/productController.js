const Product = require('../models/Product');

// Create Product
const createProduct = async (req, res) => {
  try {
    const { name, price, subCategory } = req.body;
    const product = await Product.create({ name, price, subCategory });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get All Products with Deep Populate
const getProducts = async (req, res) => {
  try {
    // Joining three tables: Product -> SubCategory -> Category
    const products = await Product.find({}).populate({
      path: 'subCategory',
      populate: {
        path: 'category',
        model: 'Category'
      }
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
