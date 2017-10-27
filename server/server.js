const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

const data = require("./data.json");

app.use(express.static("app/assets"));
app.use(express.static("node_modules/sw-toolbox"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/app/index.html");
});

app.get("/articles", function(req, res) {
  res.send(data);
});

app.get("/like", function(req, res) {
  data.highlight.ilike = !data.highlight.ilike;
  res.status(200).end();
});

app.listen(3003);
console.log("Votre serveur HTTP tourne sur le port 3003");
