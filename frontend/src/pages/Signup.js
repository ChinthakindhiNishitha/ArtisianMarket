import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    product: {
      productType: '',
      productName: '',
      imageUrl: '',
      location: '',
      price: ''
    }
  });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name in formData.product) {
      setFormData(prev => ({
        ...prev,
        product: { ...prev.product, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="">Select Role</option>
        <option value="artisan">Artisan</option>
        <option value="buyer">Buyer</option>
      </select>

      {formData.role === 'artisan' && (
        <>
          <input name="productType" placeholder="Product Type" onChange={handleChange} />
          <input name="productName" placeholder="Product Name" onChange={handleChange} />
          <input name="imageUrl" placeholder="Image URL" onChange={handleChange} />
          <input name="location" placeholder="Location" onChange={handleChange} />
          <input name="price" placeholder="Price" type="number" onChange={handleChange} />
        </>
      )}

      <button type="submit">Sign Up</button>
    </form>
  );
}
