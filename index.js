const { init } = require('./server');
const { log } = require('./utils');

init().then(() => {
  log.info('Initialized');
}).catch((e) => {
})
