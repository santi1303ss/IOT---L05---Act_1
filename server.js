const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const EXTERNAL_URL = 'https://callback-iot.up.railway.app/data';

app.use(cors());
app.use(express.json());

let dataHistory = [];
let lastVisualizedData = null;

app.get('/data', async (req, res) => {
  try {
    const response = await axios.get(EXTERNAL_URL);

    const incomingData = Array.isArray(response.data)
      ? response.data
      : [response.data];

    incomingData.forEach((item) => {
      const exists = dataHistory.some(
        (stored) =>
          stored.device === item.device &&
          stored.timestamp === item.timestamp
      );

      if (!exists) {
        dataHistory.push({
          ...item,
          receivedAt: new Date().toISOString()
        });
      }
    });

    if (dataHistory.length > 100) {
      dataHistory = dataHistory.slice(-100);
    }

    const lastTwo = dataHistory.slice(-2);

    res.json(lastTwo);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch data from external endpoint',
      details: error.message
    });
  }
});

app.post('/visualize', (req, res) => {
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({
      error: 'No data provided'
    });
  }

  const visualizableData = {
    ...data,
    visualizedAt: new Date().toISOString()
  };

  lastVisualizedData = visualizableData;

  res.json({
    success: true,
    message: 'Data received for visualization',
    data: visualizableData
  });
});

app.get('/visualize', (req, res) => {
  if (!lastVisualizedData) {
    return res.status(404).json({
      error: 'No data available for visualization'
    });
  }

  res.json(lastVisualizedData);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    dataHistoryLength: dataHistory.length,
    hasVisualizedData: !!lastVisualizedData
  });
});

app.listen(PORT, () => {
  console.log(`IoT API Server running on http://localhost:${PORT}`);
});
