const iMap = new Map();
const { log } = require('./log.js');

module.exports = function inject(key, doc) {
  if (iMap.has(key)) {
    throw new Error(`${key} already registered`);
  }
  iMap.set(key, doc);
}

inject('inject', inject);
inject('log', log);

const getIMap = () => {
  return iMap;
};

module.exports.getIMap = getIMap;
