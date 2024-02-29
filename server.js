require('dotenv').config();
const express = require('express');
const { createServer } = require('node:http');
const { HTTP_PORT } = require('./config');
const { log } = require('./utils');
const { initIO } = require('./io/io.js');
const path = require('path');

const app = express();

// const __dirname = path.resolve();
const statics = path.join(__dirname, '../dist', 'rrk-space', 'browser');

console.log(`statics`, statics);
app.use(express.static(statics))

app.get('*', (req, res) => {
  res.sendFile(path.join(statics, 'index.html'));
});

const server = createServer(app);
initIO(server);

const init = async () => {
  const listener = server.listen(HTTP_PORT);
  listener.on('listening', () => {
    log.info(`Server listening on port - ${HTTP_PORT}`);
  });
  listener.on('error', (e) => {
    log.error(`Error while starting the server`, e);
  });
};


module.exports = {
  app,
  server,
  init
};
