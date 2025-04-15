import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapPage.css';
import { useNavigate } from 'react-router-dom';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const productLocations = [
  {
    name: 'Pochampally Saree',
    city: 'Pochampally',
    lat: 17.3517,
    lng: 78.8028,
    image: 'https://www.avishya.com/cdn/shop/products/source_SSKSASA10045799_20200106170721_0.jpg?v=1633520347',
  },
  {
    name: 'Gadwal Saree',
    city: 'Gadwal',
    lat: 16.2360,
    lng: 77.8000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIbsMP-0wNzcL9g7TeH4jNTU35wf3b0ALnXQ&s',
  },
  {
    name: 'Blue Pottery',
    city: 'Jaipur',
    lat: 26.9124,
    lng: 75.7873,
    image: 'https://c9admin.cottage9.com/uploads/2322/image_2023_01_20T09_08_11_450Z-1024x723.png',
  },
  {
    name: 'Kondapally Toys',
    city: 'Kondapalli',
    lat: 16.6194,
    lng: 80.5382,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kondapalli_toys_at_a_house_in_Vijayawada.jpg/1200px-Kondapalli_toys_at_a_house_in_Vijayawada.jpg',
  },
  {
    name: 'Nirmal Paintings and Toys',
    city: 'Nirmal',
    lat: 19.0969,
    lng: 78.3442,
    image: 'https://www.dsource.in/sites/default/files/resource/nirmal-paintings-n-telangana/introduction/images/nirmal-painting-1.jpg',
  },
  {
    name: 'Marble Crafts',
    city: 'Udaipur',
    lat: 24.5854,
    lng: 73.7125,
    image: 'https://cdn.shopify.com/s/files/1/0102/1046/6339/products/Screenshot2023-01-19at12.18.11PM.png?v=1674114084',
  },
  {
    name: 'Leather Bags',
    city: 'Shantiniketan',
    lat: 23.6779,
    lng: 87.6857,
    image: 'https://m.media-amazon.com/images/I/71xxtMu38DL._AC_UY1100_.jpg',
  },
  {
    name: 'Clay Dolls',
    city: 'Krishnanagar',
    lat: 23.4066,
    lng: 88.5017,
    image: 'https://www.inditales.com/wp-content/uploads/2022/02/Clay-Dolls-Krishnanagar-West-Bengal-8.jpg',
  },
  {
    name: 'Silk Sarees',
    city: 'Kanchipuram',
    lat: 12.8352,
    lng: 79.7036,
    image: 'https://www.sundaramsilks.com/cdn/shop/files/Kanchi_Pattu_-_Top_Banner.jpg',
  },
  {
    name: 'Tanjore Paintings and Brass Idols',
    city: 'Thanjavur',
    lat: 10.7867,
    lng: 79.1378,
    image: 'https://cdn.dotpe.in/longtail/store-items/4903570/Gpr3B3x1.jpeg',
  },
  {
    name: 'Kalamkari Textiles',
    city: 'Chennai',
    lat: 13.0827,
    lng: 80.2707,
    image: 'https://www.dsource.in/sites/default/files/resource/kalamkari-hand-painted-wall-hangings/images/kalamkari-painting-1.jpg',
  },
  {
    name: 'Mirror Embroidery and Bandhani',
    city: 'Kutch',
    lat: 23.7337,
    lng: 69.8597,
    image: 'https://cdn.shopify.com/s/files/1/0573/1110/9467/products/IMG_0450-01.jpeg',
  },
  {
    name: 'Gond Paintings',
    city: 'Bhilai',
    lat: 21.1938,
    lng: 81.3509,
    image: 'https://www.itsliquid.com/wp-content/uploads/2020/12/gond-art3.jpg',
  },
  {
    name: 'Brass Handicrafts',
    city: 'Moradabad',
    lat: 28.8386,
    lng: 78.7733,
    image: 'https://images.jdmagicbox.com/quickquotes/images_main/metal-handicrafts-306542868-zyq7b.jpg',
  },
  {
    name: 'Glass Bangles',
    city: 'Firozabad',
    lat: 27.1591,
    lng: 78.3949,
    image: 'https://cdn.shopify.com/s/files/1/0594/5574/8555/products/61p4dTWqQHL.jpg',
  },
  {
    name: 'Channapatna Wooden Toys',
    city: 'Channapatna',
    lat: 12.6514,
    lng: 77.2066,
    image: 'https://5.imimg.com/data5/MU/DE/MY-10093912/channapatna-wooden-toys-500x500.jpg',
  },
  {
    name: 'Bidriware',
    city: 'Bidar',
    lat: 17.9133,
    lng: 77.5301,
    image: 'https://www.dsource.in/sites/default/files/resource/bidri-craft-karnataka/introduction/images/bidri-01.jpg',
  },
];

// Zoom helper
const ZoomToMarker = ({ lat, lng }) => {
  const map = useMap();
  if (lat && lng) {
    map.setView([lat, lng], 10);
  }
  return null;
};

const MapPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocation, setFilteredLocation] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    const found = productLocations.find((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocation(found || null);
  };

  const isVisible = (product) => {
    if (!filteredLocation) return true;
    return product.name === filteredLocation.name;
  };

  return (
    <div className="map-wrapper">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search product name (e.g., Pochampally Saree)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <MapContainer center={[18.1124, 79.0193]} zoom={6.5} scrollWheelZoom={true} style={{ height: '100vh' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {productLocations.map((product, index) =>
          isVisible(product) && (
            <Marker key={index} position={[product.lat, product.lng]}>
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <strong>{product.name}</strong><br />
                  <img src={product.image} alt={product.name} width="100" style={{ marginTop: '5px', borderRadius: '8px' }} /><br />
                  <small>{product.city}</small><br />
                  <button onClick={() => navigate(`/products/${encodeURIComponent(product.name)}`)}>View Product Type</button>

                </div>
              </Popup>
            </Marker>
          )
        )}

        {filteredLocation && <ZoomToMarker lat={filteredLocation.lat} lng={filteredLocation.lng} />}
      </MapContainer>
    </div>
  );
};

export default MapPage;
