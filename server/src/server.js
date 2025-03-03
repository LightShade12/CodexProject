const express = require('express');
const cors = require('cors'); // Import CORS middleware
const app = express();
const port = 3000;

// Enable CORS for all routes (important for local development when frontend and backend are on different ports)
app.use(cors());

app.get('/api/message', (req, res) => {
  const message = "Hello from the backend!";
  res.json({ msg: message });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});