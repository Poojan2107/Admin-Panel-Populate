import { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/categories', { name });
      setName('');
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Category Management</h1>
      
      <div className="card">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g., Electronics"
              required 
            />
          </div>
          <button type="submit" className="btn">Create Category</button>
        </form>
      </div>

      <div className="card">
        <h2>All Categories</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat._id}</td>
                  <td>{cat.name}</td>
                  <td>{new Date(cat.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
