import axios from 'axios';

// Single-service: same-origin /api in production; dev uses local backend
const baseURL = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';

const API = axios.create({
  baseURL,
});

export const fetchProducts = (sortBy = '', category = '') => {
  let queryString = '';
  if (sortBy) {
    queryString += `sortBy=${sortBy}`;
  }
  if (category) {
    queryString += `${queryString ? '&' : ''}category=${category}`;
  }
  return API.get(`/products${queryString ? `?${queryString}` : ''}`);
};
export const createProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const fetchCategories = () => API.get('/products/categories');
