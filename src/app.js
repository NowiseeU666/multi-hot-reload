const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
})

app.get('/', (req, res) => {
  res.body = "socket";
});

module.exports = app;