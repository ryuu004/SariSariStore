const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// CREATE
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all
router.get('/', async (req, res) => {
  try {
    const { category, sortBy } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }
    let sortOptions = {};
    if (sortBy === 'category') {
      sortOptions.category = 1; // 1 for ascending, -1 for descending
    } else if (sortBy === 'name') {
      sortOptions.name = 1;
    } else if (sortBy === 'price') {
      sortOptions.price = 1;
    } else if (sortBy === 'stock') {
      sortOptions.stock = 1;
    }
    const products = await Product.find(query).sort(sortOptions);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET unique categories
router.get('/categories', async (req, res) => {
  try {
    let categories = await Product.distinct('category');
    // Normalize categories: trim whitespace and convert to lowercase
    categories = categories.map(cat => cat.trim().toLowerCase());
    // Filter out duplicates that might arise from normalization
    categories = [...new Set(categories)];
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;