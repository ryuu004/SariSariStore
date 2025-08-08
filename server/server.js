const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// CORS: only needed when frontend is on a different origin (e.g., local dev)
const enableCors = Boolean(process.env.CLIENT_ORIGIN);
if (enableCors) {
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    })
  );
}

// Health check endpoint for Render
app.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});

// MongoDB connection
if (!process.env.MONGO_URI) {
  console.error('Missing MONGO_URI environment variable');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('Mongo connection error:', err);
    process.exit(1);
  });

app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 5000;

// Serve static frontend in production (single-service deployment)
const staticDir = path.resolve(__dirname, '../client/dist');
app.use(express.static(staticDir));

// SPA fallback: send index.html for non-API routes (Express 5 compatible)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
