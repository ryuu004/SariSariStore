import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../services/api';

const CategorySidebar = ({ onSelectCategory, selectedCategory, refreshTrigger }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        // Normalize and ensure uniqueness on the frontend as well
        let uniqueCategories = response.data.map(cat => cat.trim().toLowerCase());
        uniqueCategories = [...new Set(uniqueCategories)];
        // Sort categories alphabetically
        const sortedCategories = uniqueCategories.sort((a, b) => a.localeCompare(b));
        setCategories(sortedCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    getCategories();
  }, [refreshTrigger]); // Re-fetch categories when refreshTrigger changes

  return (
    <div className="w-64 card p-4">
      <h3 className="text-lg mb-4">Categories</h3>
      <ul>
        <li
          className={`cursor-pointer py-2 px-3 rounded-md transition-colors duration-200 ${
            selectedCategory === 'All' ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 text-gray-700'
          }`}
          onClick={() => onSelectCategory('All')}
        >
          All Products
        </li>
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer py-2 px-3 rounded-md transition-colors duration-200 ${
              selectedCategory === category ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 text-gray-700'
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;