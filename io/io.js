const { Server } = require('socket.io');
const { log } = require('../utils/index.js');
const room = require('./room.js');
const { removePeerSocket, DataService } = require('./data.js');

const initIO = (server) => {
  const io = new Server(server);
  log.info('IO Server attached');

  const textshareSpace = io.of('/textshare');
  const realstreamSpace = io.of('/realstream');
  const auctionSpace = io.of('/auction');

  const rsStore = new DataService();

  room(textshareSpace, io);
  room(realstreamSpace, io, rsStore);
  room(auctionSpace, io);
  room(io);

  io.on('connection', (socket) => {
    log.info(`User connected - ${socket.id}`);
    socket.on('disconnect', (reason) => {
      log.info(`User disconnected - ${reason}`);
      rsStore.removePeerSocket(socket);
    });
  });
}

module.exports = {
  initIO
};
