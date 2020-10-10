const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();

// Parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Send HTTP requests to server to the correct routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Static content requests go to public folder
app.use(express.static('public'));

// Use environment's default port or explicitly use 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});