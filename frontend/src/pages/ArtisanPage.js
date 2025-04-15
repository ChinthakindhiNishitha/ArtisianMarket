// src/pages/ArtisanPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArtisanPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const artisanId = localStorage.getItem('userId');

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/artisan/${artisanId}`);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching artisan products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="artisan-dashboard">
      <h2>My Product</h2>
      {products.length === 0 ? (
        <p>No product found.</p>
      ) : (
        products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.productName} />
            <h3>{product.productName}</h3>
            <p>Type: {product.productType}</p>
            <p>Location: {product.location}</p>
            <p>Price: ₹{product.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ArtisanPage;
