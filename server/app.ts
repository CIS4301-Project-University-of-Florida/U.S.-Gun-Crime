import express from 'express';

const PORT = 3000;

const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});