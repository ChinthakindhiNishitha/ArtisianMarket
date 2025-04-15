import React, { useEffect, useState } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import './ProductShop.css';

const ProductShop = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/products/${encodeURIComponent(type)}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:",err));
  }, [type]);

  const handleBackToMap = () => {
    navigate('/map');
  };

  // Dummy handlers for now
  const handleAddToCart = (productId) => {
    console.log('Add to cart:', productId);
  };

  const handleBuyNow = (productId) => {
    console.log('Buy now:', productId);
  };

  const handleWishlistToggle = (productId) => {
    console.log('Toggle wishlist for:', productId);
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
              
              <div className="product-buttons">
                <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
                <button onClick={() => handleBuyNow(product._id)}>Buy Now</button>
                <button className="wishlist-btn" onClick={() => handleWishlistToggle(product._id)}>
                  🤍
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found for {type}.</p>
        )}
      </div>

      <div className="back-to-map-container">
        <button className="back-to-map-btn" onClick={handleBackToMap}>
          ⬅️ Back to Map
        </button>
      </div>
    </div>
  );
};

export default ProductShop;
