import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import axios from 'axios';

const HeatmapLayer = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const heatLayer = window.L.heatLayer(data, { radius: 25 }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null;
};

const FetchHeatmapData = ({ setHeatmapData }) => {
  const map = useMap();

  useMapEvents({
    moveend: async () => {
      const bounds = map.getBounds();
      const params = {
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      };

      try {
        const response = await axios.get('/api/temperature-data', { params });
        const data = response.data.map(({ lat, lng, temp }) => [lat, lng, temp]);
        setHeatmapData(data);
      } catch (error) {
        console.error('Error fetching heatmap data:', error);
      }
    }
  });

  return null;
};

const Heatmap = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FetchHeatmapData setHeatmapData={setHeatmapData} />
      <HeatmapLayer data={heatmapData} />
    </MapContainer>
  );
};

export default Heatmap;
