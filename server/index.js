const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const AppService = require('./service') 
 
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../front/build')));

// create application/json parser
const jsonParser = bodyParser.json()

// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/trainers', async (req, res) => {
  const trainers = await AppService.getTrainers();
  const clients = await AppService.getClients();

  res.json({trainers, clients});
});

app.post('/trainers', jsonParser, async (req, res) => {
  const {trainers} = req.body;
  const result = await AppService.calculateClients(trainers);

  res.json(result);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../front/build', 'index.html'));
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

