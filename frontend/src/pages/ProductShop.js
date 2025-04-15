import React, { useEffect, useState } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import './ProductShop.css'; // your styling file

const ProductShop = () => {
  const { type } = useParams();
  const navigate = useNavigate(); // navigation hook
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/products/${encodeURIComponent(type)}`)

      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:",err));
  }, [type]);
  
  const handleBackToMap = () => {
    navigate('/map'); // adjust if your map route is different
  };

  return (
    <div className="product-shop-container">
      <h2>{type}</h2>
      
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={product.imageUrl} alt={product.productName} />
              <h3>{product.productName}</h3>
              <p>₹ {product.price}</p>
              <p>{product.location}</p>
            </div>
          ))
        ) : (
          <p>No products found for {type}.</p>
        )}
      </div>
      <div className="back-to-map-container">
       <button className="back-to-map-btn" onClick={() => navigate('/map')}>
        ⬅️ Back to Map
         </button>
    </div>

    </div>
  );
};

export default ProductShop;
