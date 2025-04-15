import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', data);
      const user = res.data;

      setMessage('Login successful! Redirecting...');

      setTimeout(() => {
        if (user.role === 'artisan') {
          navigate('/artisan', { state: user });
        } else {
          navigate('/map');
        }
      }, 1500);
    } catch (err) {
      setMessage('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login Here</h2>
        <input
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        {message && <p className="login-message">{message}</p>}
      </form>
    </div>
  );
}
