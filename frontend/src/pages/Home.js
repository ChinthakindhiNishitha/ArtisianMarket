import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-background">
      <nav className="navbar">
        <div className="nav-buttons">
          <button className="nav-btn" onClick={() => navigate('/login')}>Login</button>
          <button className="nav-btn signup" onClick={() => navigate('/signup')}>Signup</button>
        </div>
      </nav>

      <div className="home-content">
        <h1>Welcome to Hasthaveedhi 🛍️</h1>
        <p>Your unique marketplace for handcrafted wonders!
        At HasthaVeedhi, we bridge the gap between local artisans and customers through a unique, interactive platform. Our mission is to empower skilled craftsmen across India by showcasing their traditional, handmade products directly to buyers—no middlemen, just pure craftsmanship.
        </p>
      </div>
    </div>
  );
};

export default Home;
