const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // You can change the port number if needed

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving index.html as the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.ejs'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
