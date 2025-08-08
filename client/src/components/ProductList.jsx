import React from 'react';
import { PencilIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon, PhotoIcon } from '@heroicons/react/24/outline';

const ProductList = ({ products, onEdit, onDelete, onSort, sortConfig }) => {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    if (sortConfig.direction === 'ascending') {
      return <ChevronUpIcon className="h-4 w-4 ml-1 inline" />;
    }
    return <ChevronDownIcon className="h-4 w-4 ml-1 inline" />;
  };

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-12 sm:py-16 text-center px-4">
        <PhotoIcon className="h-12 w-12 text-gray-300" />
        <p className="mt-4 text-gray-600">No products found. Try adding a new product or adjusting your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product) => (
        <div key={product._id} className="group card card-padding card-hover">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg">{product.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{product.category}</p>
            </div>
            <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition">
              <button
                onClick={() => onEdit(product)}
                className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white p-1.5 text-brand-600 hover:bg-brand-50 hover:border-brand-200"
                aria-label={`Edit ${product.name}`}
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(product._id)}
                className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white p-1.5 text-red-600 hover:bg-red-50 hover:border-red-200"
                aria-label={`Delete ${product.name}`}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-brand-700">₱{product.price.toFixed(2)}</span>
            <span
              className={`badge ${
                product.stock > 10
                  ? 'badge-success'
                  : 'badge-danger'
              }`}
            >
              Stock: {product.stock}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

