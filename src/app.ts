// primeiroApp.js
const express = require('express');
const app = express();

app.get('/', (req: any, res: any) => {
  return res.send('Hello World!');
});