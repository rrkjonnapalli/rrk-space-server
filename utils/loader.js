const{ readdir } = require('node:fs/promises');
const path = require('path');
const inject = require('./injector');
const log = require('./log');
const { getIMap } = log;
const __dirname = path.resolve();
const basepath = path.join(__dirname);
readdir(basepath, { withFileTypes: true, recursive: true }).then(async (files) => {
  const projectFiles = files.filter(e => (
    e.isFile()
    && !(
      e.path.includes('node_modules')
      || e.path.includes('/utils')
    )
    && e.name.endsWith('.js')
  ));
  log.info(projectFiles.slice(2));
  await projectFiles.slice(2).map(async ({ name, path }) => {
    const [id, type] = name.split('.');
    const m = await import(`${path}/${name}`);
    console.log(`type is - `, type);
    console.log(`m is - `, m);
    let doc = {};
    if (type === 'config') {
      doc = m;
    } else {
      doc = m.default(getIMap());
    }
    const key = `${type}$${id}`;
    inject(key, doc);
  });
  // console.log('imap', getIMap());
})
