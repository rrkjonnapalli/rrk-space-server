const HTTP_PORT = parseInt(process.env.HTTP_PORT || '8080');
const IO_PORT = parseInt(process.env.IO_PORT || '8089');

module.exports = {
  HTTP_PORT,
  IO_PORT
};
