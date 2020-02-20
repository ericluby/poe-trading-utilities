const path = require('path');
const express = require('express');
var cors = require('cors');
const getDivCardsAndItems = require('./getDivCardsAndItems.js');
const server = express();
const port = process.env.PORT || 3000;
server.use(cors());
//access website at http://localhost:3000/
server.get('/', (req, res) => res.sendFile(path.join(__dirname,'index.html')))
server.get('/divitems', async function divItemsHandler (req, res) {
  console.log('Starting to get the Div Items');
  const storedData = await getDivCardsAndItems();
  res.json(storedData);
  console.log('Successfully got the Div Items. Sending them back now.');
});

server.listen(port, () => console.log(`Server starting on port ${port}!`));
