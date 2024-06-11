const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.REACT_APP_PORT || 3000;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve static files from the 'public' directory
app.use('/', express.static(path.join(__dirname, 'public')));

// Always return the main index.html, so react-router can handle the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
