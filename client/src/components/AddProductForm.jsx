import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct, fetchCategories } from '../services/api';

function AddProductForm({ selected, onSuccess, onCancel }) {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (selected) {
      setProduct({
        name: selected.name || '',
        price: selected.price || '',
        stock: selected.stock || '',
        category: selected.category || '',
      });
    } else {
      setProduct({ name: '', price: '', stock: '', category: '' });
    }
  }, [selected]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        // Normalize, dedupe, sort
        let uniqueCategories = response.data
          .filter(Boolean)
          .map((cat) => cat.trim().toLowerCase());
        uniqueCategories = [...new Set(uniqueCategories)].sort((a, b) => a.localeCompare(b));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    getCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productToSave = {
        ...product,
        category: product.category.trim().toLowerCase(), // Normalize category
      };

      if (selected) {
        await updateProduct(selected._id, productToSave);
      } else {
        await createProduct(productToSave);
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={product.name}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500"
          required
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={product.price}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500"
          required
        />
      </div>
      <div>
        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          name="stock"
          id="stock"
          value={product.stock}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500"
          required
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          name="category"
          id="category"
          list="category-suggestions"
          value={product.category}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500"
        />
        <datalist id="category-suggestions">
          {categories.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-ghost font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {selected ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}

export default AddProductForm;

