import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <NavLink to="/" className="logo">AdminPanel</NavLink>
        <div className="nav-links">
          <NavLink to="/categories" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Categories</NavLink>
          <NavLink to="/subcategories" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Subcategories</NavLink>
          <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Products</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
