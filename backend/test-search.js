require('dotenv').config();
const express = require('express');
const searchRoute = require('./routes/search');

const app = express();

app.use(express.json());
app.use('/artisans/search', searchRoute);

const PORT = 5001; // Using a different port to avoid conflicts with server.js

app.listen(PORT, () => {
  console.log(`Search Testing Server running on port ${PORT}`);
  console.log(`Test URL: http://localhost:${PORT}/artisans/search?skill=Plumbing&minRating=4`);
  console.log(`Ctrl+C to stop.`);
});

