import { useLocation } from 'react-router-dom';

export default function ArtisanPage() {
  const { state } = useLocation();
  const { username, product } = state;

  return (
    <div>
      <h2>Welcome {username}</h2>
      <h3>Product Details:</h3>
      <p><strong>Type:</strong> {product.productType}</p>
      <p><strong>Name:</strong> {product.productName}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Location:</strong> {product.location}</p>
      <img src={product.imageUrl} alt={product.productName} width="200" />
    </div>
  );
}
