import React, { useEffect, useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import AddProductForm from '../components/AddProductForm';
import ProductList from '../components/ProductList';
import CategorySidebar from '../components/CategorySidebar'; // Import CategorySidebar
import { fetchProducts, deleteProduct, fetchCategories } from '../services/api';

function Inventory() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [selectedCategory, setSelectedCategory] = useState('All'); // New state for selected category
  const [availableCategories, setAvailableCategories] = useState([]); // for mobile dropdown

  const loadProducts = async (category = 'All') => {
    try {
      const res = await fetchProducts(sortConfig.key, category === 'All' ? '' : category); // Pass category to fetchProducts
      setProducts(res.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    }
  };

  // Add a state to explicitly trigger category refresh
  const [categoryRefreshKey, setCategoryRefreshKey] = useState(0);

  const triggerCategoryRefresh = () => {
    setCategoryRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    loadProducts(selectedCategory); // Load products based on selected category
  }, [selectedCategory, sortConfig.key, categoryRefreshKey]); // Re-fetch when selectedCategory, sortConfig.key, or categoryRefreshKey changes

  // Fetch categories for mobile dropdown
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        let uniqueCategories = response.data.map((cat) => cat.trim().toLowerCase());
        uniqueCategories = [...new Set(uniqueCategories)].sort((a, b) => a.localeCompare(b));
        setAvailableCategories(uniqueCategories);
      } catch (err) {
        console.error('Failed to fetch categories for mobile:', err);
      }
    };
    getCategories();
  }, [categoryRefreshKey]);

  const handleAddOrUpdateProduct = () => {
    loadProducts(selectedCategory); // Reload products for the current category
    setIsModalOpen(false);
    setSelectedProduct(null);
    triggerCategoryRefresh(); // Trigger category refresh after adding/updating product
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      loadProducts(selectedCategory);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNewProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const sortedProducts = React.useMemo(() => {
    let sortableItems = [...products];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [products, sortConfig]);

  const filteredProducts = sortedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container pt-10 pb-24 safe-bottom">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl">Inventory</h1>
          <p className="mt-1 text-gray-600">Manage your products and track stock levels.</p>
        </div>
        <div className="flex w-full sm:w-auto sm:ml-auto flex-col sm:flex-row items-stretch sm:items-center gap-3 min-w-0">
          <div className="relative w-full sm:w-80">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          {/* Mobile category dropdown */}
          <div className="sm:hidden">
            <select
              value={selectedCategory}
              onChange={(e) => handleSelectCategory(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm"
            >
              <option value="All">All categories</option>
              {availableCategories.map((c) => (
                <option key={c} value={c} className="capitalize">
                  {c}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddNewProduct}
            className="btn btn-primary w-full sm:w-auto whitespace-nowrap shrink-0"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card card-padding">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="card card-padding">
          <p className="text-sm text-gray-500">Low Stock (≤ 10)</p>
          <p className="text-2xl font-bold text-red-600">{products.filter(p => p.stock <= 10).length}</p>
        </div>
        <div className="card card-padding">
          <p className="text-sm text-gray-500">Active Category</p>
          <p className="text-2xl font-bold text-brand-700 capitalize">{selectedCategory}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Category Sidebar */}
        <div className="hidden lg:block">
          <CategorySidebar
            onSelectCategory={handleSelectCategory}
            selectedCategory={selectedCategory}
            refreshTrigger={categoryRefreshKey}
          />
        </div>

        {/* Product List */}
        <div className="flex-1">
          {/* Sort controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <FunnelIcon className="h-5 w-5" />
              <span className="text-sm">Sort by:</span>
            </div>
            <div className="flex flex-nowrap gap-2 overflow-x-auto whitespace-nowrap pb-1 px-1">
              <button
                onClick={() => requestSort('name')}
                className={`px-3 py-1.5 rounded-md text-sm border ${sortConfig.key === 'name' ? 'bg-brand-50 text-brand-700 border-brand-200' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
              >
                Name
              </button>
              <button
                onClick={() => requestSort('price')}
                className={`px-3 py-1.5 rounded-md text-sm border ${sortConfig.key === 'price' ? 'bg-brand-50 text-brand-700 border-brand-200' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
              >
                Price
              </button>
              <button
                onClick={() => requestSort('stock')}
                className={`px-3 py-1.5 rounded-md text-sm border ${sortConfig.key === 'stock' ? 'bg-brand-50 text-brand-700 border-brand-200' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
              >
                Stock
              </button>
              <button
                onClick={() => requestSort('category')}
                className={`px-3 py-1.5 rounded-md text-sm border ${sortConfig.key === 'category' ? 'bg-brand-50 text-brand-700 border-brand-200' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
              >
                Category
              </button>
            </div>
          </div>

          {/* Product List */}
          <ProductList
            products={filteredProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onSort={requestSort}
            sortConfig={sortConfig}
          />
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">{selectedProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <AddProductForm
              selected={selectedProduct}
              onSuccess={handleAddOrUpdateProduct}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;

