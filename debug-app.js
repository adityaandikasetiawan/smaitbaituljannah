const express = require('express');
const app = express();
const PORT = 3002;

console.log('Debug app starting...');

// Minimal middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test routes
app.get('/debug-test', (req, res) => {
  console.log('Debug test route hit!');
  res.send('DEBUG TEST WORKS!');
});

app.get('/', (req, res) => {
  res.send('Debug app root works!');
});

// 404 handler
app.use((req, res) => {
  console.log('404 for:', req.path);
  res.status(404).send('Debug 404: ' + req.path);
});

app.listen(PORT, () => {
  console.log(`Debug server running on http://localhost:${PORT}`);
});