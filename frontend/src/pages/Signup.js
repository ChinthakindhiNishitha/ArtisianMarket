// src/pages/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // optional: for styling

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'buyer',
    productType: '',
    productName: '',
    imageUrl: '',
    location: '',
    price: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isArtisan = formData.role === 'artisan';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, role, productType, productName, imageUrl, location, price } = formData;

    // Password validation
    const passwordRegex = /^(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return setError('Password must be at least 8 characters and include a special character.');
    }

    const payload = {
      username,
      email,
      password,
      role
    };
    
    if (role === 'artisan') {
      payload.productType = productType;
      payload.productName = productName;
      payload.imageUrl = imageUrl;
      payload.location = location;
      payload.price = price;
    }
    
    await axios.post('/api/auth/signup', payload);
    

    try {
      await axios.post('http://localhost:5000/api/auth/signup', payload);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}

        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

        <select name="role" onChange={handleChange}>
          <option value="buyer">Buyer</option>
          <option value="artisan">Artisan</option>
        </select>

        {isArtisan && (
          <>
            <input type="text" name="productType" placeholder="Product Type" onChange={handleChange} required />
            <input type="text" name="productName" placeholder="Product Name" onChange={handleChange} required />
            <input type="text" name="imageUrl" placeholder="Image URL" onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
          </>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
