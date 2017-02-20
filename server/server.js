const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path')

const http2 = process.argv[2] === 'http2';

if (http2) {
  const javascript = fs.readFileSync('./app/assets/script.js');
  const stylesheet = fs.readFileSync('./app/assets/style.css');

  app.get('/', function (req, res) {
    res.push('/script.js', {
      response: {
        'content-type': 'application/javascript'
      }
    })
      .end(javascript)

    res.push('/style.css', {
      response: {
        'content-type': 'text/css'
      }
    })
      .end(stylesheet)

    res.sendFile(__dirname + '/app/index.html');
  })

  const options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
  };

  require('spdy').createServer(options, app).listen(3002);
  console.log('Votre serveur HTTP tourne sur le port 3002');

} else {
  app.use(express.static('app/assets'));
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/index.html');
  })
  app.listen(3003);
  console.log('Votre serveur HTTP tourne sur le port 3003');
}