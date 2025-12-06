import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductPage = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const [subRes, prodRes] = await Promise.all([
        axios.get('http://localhost:5000/api/subcategories'),
        axios.get('http://localhost:5000/api/products')
      ]);
      setSubCategories(subRes.data.data);
      setProducts(prodRes.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, { 
          name, 
          price: Number(price), 
          subCategory: subCategoryId 
        });
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/products', { 
          name, 
          price: Number(price), 
          subCategory: subCategoryId 
        });
      }
      setName('');
      setPrice('');
      setSubCategoryId('');
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setSubCategoryId(product.subCategory?._id || '');
    setEditId(product._id);
  };


  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Product Management</h1>
      
      <div className="card">
        <h2>{editId ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g., MacBook Pro M3"
              required 
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              placeholder="0.00"
              required 
            />
          </div>
          <div className="form-group">
            <label>SubCategory</label>
            <select value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)} required>
              <option value="">Select SubCategory</option>
              {subCategories.map((sub) => (
                <option key={sub._id} value={sub._id}>{sub.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn">
            {editId ? 'Update Product' : 'Create Product'}
          </button>
          {editId && (
            <button 
              type="button" 
              className="btn" 
              style={{ marginLeft: '1rem', backgroundColor: '#64748b' }}
              onClick={() => {
                setEditId(null);
                setName('');
                setPrice('');
                setSubCategoryId('');
              }}
            >
              Cancel
            </button>
          )} 
        </form>
      </div>

      <div className="card">
        <h2>All Products (Joined 3 Tables)</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>SubCategory</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod._id}>
                  <td>{prod.name}</td>
                  <td>${prod.price}</td>
                  <td>{prod.subCategory ? prod.subCategory.name : 'N/A'}</td>
                  <td>
                    {prod.subCategory && prod.subCategory.category 
                      ? prod.subCategory.category.name 
                      : 'N/A'}
                  </td>
                  <td>
                    <button 
                      onClick={() => handleEdit(prod)}
                      className="btn"
                      style={{ padding: '0.5rem', fontSize: '0.875rem', marginRight: '0.5rem' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(prod._id)}
                      className="btn btn-delete"
                      style={{ padding: '0.5rem', fontSize: '0.875rem' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
