import { useState, useEffect } from 'react';
import axios from 'axios';

const SubCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const fetchData = async () => {
    try {
      const [catRes, subRes] = await Promise.all([
        axios.get('http://localhost:5000/api/categories'),
        axios.get('http://localhost:5000/api/subcategories')
      ]);
      setCategories(catRes.data.data);
      setSubCategories(subRes.data.data);
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
      await axios.post('http://localhost:5000/api/subcategories', { name, category: categoryId });
      setName('');
      setCategoryId('');
      const res = await axios.get('http://localhost:5000/api/subcategories');
      setSubCategories(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>SubCategory Management</h1>
      
      <div className="card">
        <h2>Add SubCategory</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>SubCategory Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g., Laptops"
              required 
            />
          </div>
          <div className="form-group">
            <label>Parent Category</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn">Create SubCategory</button>
        </form>
      </div>

      <div className="card">
        <h2>All SubCategories</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category (Populated)</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {subCategories.map((sub) => (
                <tr key={sub._id}>
                  <td>{sub._id}</td>
                  <td>{sub.name}</td>
                  <td>{sub.category ? sub.category.name : 'N/A'}</td>
                  <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryPage;
