const pino = require('pino');

const log = pino({
  transport: {
    target: 'pino-pretty'
  }
});

module.exports = log;
