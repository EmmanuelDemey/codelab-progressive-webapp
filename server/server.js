const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path')

const data = require('./data.json');

const http2 = process.argv[2] === 'http2';

app.get('/articles', function (req, res) {
  res.send(data);
});

app.get('/like', function (req, res) {
  data.highlight.ilike = !data.highlight.ilike;
  res.status(200).end();
});

if (http2) {
  const javascript = fs.readFileSync('./app/assets/script.js');
  const stylesheet = fs.readFileSync('./app/assets/css/main.css');
  const font = fs.readFileSync('./app/assets/css/exo-medium-webfont.woff');
  const font2 = fs.readFileSync('./app/assets/css/exo-medium-webfont.woff2');
  const logo = fs.readFileSync('./app/assets/imgs/logo.svg');
  const like = fs.readFileSync('./app/assets/imgs/like.svg');
  
  app.get('/', function (req, res) {
    res.push('/script.js', { response: { 'content-type': 'application/javascript' } }).end(javascript)
    res.push('/css/main.css', { response: { 'content-type': 'text/css' } }).end(stylesheet)
    res.push('/css/exo-medium-webfont.woff', { response: { 'content-type': 'font/woff' } }).end(font)
    res.push('/css/exo-medium-webfont.woff2', { response: { 'content-type': 'font/woff2' } }).end(font2)
    res.push('/imgs/logo.svg', { response: { 'content-type': 'image/svg+xml' } }).end(logo)
    res.push('/imgs/like.svg', { response: { 'content-type': 'image/svg+xml' } }).end(like)
    res.sendFile(__dirname + '/app/index.html');
  })

  app.use(express.static('app/assets'));
  app.use(express.static('node_modules/sw-toolbox'));
  
  const options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
  };

  require('spdy').createServer(options, app).listen(3002);
  console.log('Votre serveur HTTP tourne sur le port 3002');

} else {
  app.use(express.static('app/assets'));
  app.use(express.static('node_modules/sw-toolbox'));
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/index.html');
  })
  
  app.listen(3003);
  console.log('Votre serveur HTTP tourne sur le port 3003');
}