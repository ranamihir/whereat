const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

// Serve static assets
app.use(express.static(__dirname + '/public'));

// Handles all routes and sends index.html as response
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port);
console.log('Server started on port ' + port);
