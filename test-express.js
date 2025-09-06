const express = require('express');
const app = express();
const PORT = 3001;

app.get('/test', (req, res) => {
  res.send('TEST WORKS!');
});

app.get('/', (req, res) => {
  res.send('ROOT WORKS!');
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});