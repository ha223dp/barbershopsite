import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const Map: React.FC = () => {
  useEffect(() => {
    // Correct coordinates for Salong Victoria AB at Ekeby Bruk 6c, Uppsala
    const map = L.map('map').setView([59.8484268, 17.6077446], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([59.8484268, 17.6077446]).addTo(map)
      .bindPopup('<strong>Salong Victoria AB Herrfrisör</strong><br>Ekeby Bruk 6c, 752 63 Uppsala<br><a href="tel:0737134008">073-713 40 08</a>')
      .openPopup();

    // Cleanup function
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" className="w-full h-full rounded-lg"></div>;
};

export default Map;