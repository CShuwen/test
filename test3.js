import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Legend = () => {
  const map = useMap();

  useEffect(() => {
    const legend = window.L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = window.L.DomUtil.create('div', 'info legend');
      const grades = [0, 10, 20, 30, 40, 50];
      const labels = [];

      for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
    };

    legend.addTo(map);

    return () => {
      map.removeControl(legend);
    };
  }, [map]);

  const getColor = (d) => {
    return d > 50 ? '#800026' :
           d > 40 ? '#BD0026' :
           d > 30 ? '#E31A1C' :
           d > 20 ? '#FC4E2A' :
           d > 10 ? '#FD8D3C' :
                    '#FFEDA0';
  };

  return null;
};

export default Legend;
