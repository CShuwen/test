const express = require('express');
const app = express();
const port = 3000;

app.get('/api/temperature-data', (req, res) => {
  const { north, south, east, west } = req.query;

  const data = [
    { lat: 51.505, lng: -0.09, temp: 20 },
    { lat: 51.515, lng: -0.1, temp: 25 },
    { lat: 51.525, lng: -0.11, temp: 30 },
    // Add more data points here
  ];

  const filteredData = data.filter(({ lat, lng }) => 
    lat <= north && lat >= south && lng <= east && lng >= west
  );

  res.json(filteredData);
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
