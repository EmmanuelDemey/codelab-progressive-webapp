const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path')

app.use(express.static('app/assets'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

app.listen(3003);
console.log('Votre serveur HTTP tourne sur le port 3003');
