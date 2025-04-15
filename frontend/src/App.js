import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ArtisanPage from './pages/ArtisanPage';
import MapPage from './pages/MapPage';
import ProductShop from './pages/ProductShop';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/artisan" element={<ArtisanPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/products/:type" element={<ProductShop />} />

      </Routes>
    </Router>
  );
}

export default App;
