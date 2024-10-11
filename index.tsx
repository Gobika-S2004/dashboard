// pages/products.js
import React, { useState } from 'react';

const productsData = [
  { id: 1, name: 'Silver Water Bottle', price: 120, stock: 10 },
  { id: 2, name: 'Cables', price: 200, stock: 5 },
  { id: 3, name: 'Smart Phones', price: 15000, stock: 5 },
];

// Layout component for the responsive dashboard layout
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-4">
      <aside className="bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold text-white">Dashboard</h2>
        <nav>
          <ul>
            <li><a href="/" className="block py-2 text-white">Home</a></li>
            <li><a href="/products" className="block py-2 text-white">Products</a></li>
          </ul>
        </nav>
      </aside>
      <main className="col-span-3 p-6">
        {children}
      </main>
    </div>
  );
};

// ProductForm component for creating new products
const ProductForm = ({ addProduct }) => {
  const [formData, setFormData] = useState({ name: '', price: '', stock: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(formData);
    setFormData({ name: '', price: '', stock: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="name" className="block text-white">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          className="w-full p-2 border border-gray-300 text-black"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="price" className="block text-white">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter product price"
          className="w-full p-2 border border-gray-300 text-black"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="stock" className="block text-white">Stock Quantity</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Enter stock quantity"
          className="w-full p-2 border border-gray-300 text-black"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Add Product</button>
    </form>
  );
};

// Main Products page with list, sorting, filtering, and form
const Products = () => {
  const [products, setProducts] = useState(productsData);
  const [filterText, setFilterText] = useState('');
  const [sortKey, setSortKey] = useState('');

  const handleSort = (key) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (key === 'price' || key === 'stock') {
        return a[key] - b[key];
      } else {
        return a[key].localeCompare(b[key]);
      }
    });
    setProducts(sortedProducts);
    setSortKey(key);
  };

  const addProduct = (newProduct) => {
    setProducts([...products, { id: products.length + 1, ...newProduct }]);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-">Product List</h1>
      <ProductForm addProduct={addProduct} />
      <input
        type="text"
        placeholder="Filter by name"
        className="mb-4 p-2 border border-gray-300 text-black"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <div className="mb-4">
        <button onClick={() => handleSort('name')} className="mr-2">Sort by Name</button>
        <button onClick={() => handleSort('price')} className="mr-2">Sort by Price</button>
        <button onClick={() => handleSort('stock')}>Sort by Stock</button>
      </div>
      <table className="min-w-full bg-white border border-gray-200 text-black">
        <thead>
          <tr>
            <th className="px-4 py-2 text-black">Name</th>
            <th className="px-4 py-2 text-black">Price</th>
            <th className="px-4 py-2 text-black">Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">${product.price}</td>
              <td className="border px-4 py-2">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Products;
