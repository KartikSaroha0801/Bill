const express = require('express');
const app = express();
const port = 3000; // Choose any available port you prefer

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
