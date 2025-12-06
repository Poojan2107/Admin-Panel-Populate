const SubCategory = require('../models/SubCategory');

// Create SubCategory
const createSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const subCategory = await SubCategory.create({ name, category });
    res.status(201).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get All SubCategories with Populate Category
const getSubCategories = async (req, res) => {
  try {
    // Joining two tables: SubCategory -> Category
    const subCategories = await SubCategory.find({}).populate('category');
    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { createSubCategory, getSubCategories };
