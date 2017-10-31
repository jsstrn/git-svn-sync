const os = require('os');
const Sync = require('./sync');
const logger = require('./logger');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 5000;
const hostname = os.hostname();
const webhook = 'webhook';

app.use(bodyParser.json());

app.use((req, res, next) => {
  logger.info('Method:', req.method);
  if (req.method === 'POST') {
    logger.info('Body', req.body);
  }
  next();
});

app.get('/', (req, res) => res.send(`Point your Git repository's webhook to ${hostname}:${port}/${webhook}`));

app.get(`/${webhook}`, (req, res) => res.send(`Point your repository's webhook to ${hostname}:${port}/${webhook}`));

app.post(`/${webhook}`, (req, res) => {
  (new Sync(req.body)).exec();
  res.json(req.body);
});

app.listen(port, () => logger.info(`Listening on ${hostname}:${port}`));
