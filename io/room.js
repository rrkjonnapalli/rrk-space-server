const { isUUID } = require('validator');
const { log, _ } = require('../utils');
const tag = __filename;
const streamIO = require('./stream');

module.exports = function room(io, rootIO, store) {
  const ioName = _.get(io, 'name', '/');
  log.info(`Attaching room handers - ${ioName} - ${tag}`);
  io.on('connection', (socket) => {
    log.info(`user ${socket.id} connected to - ${ioName}`);

    // io.adapter.on('join-room', (room, id) => {
    //   log.info(`adapter create room: socket - ${id} joined room - ${room}`);
    // });
    // io.adapter.on('create-room', (room) => {
    //   log.info(`adapter create room - ${JSON.stringify(room)}`);
    // });
    // io.adapter.on('delete-room', (room) => {
    //   log.info(`adapter delete-room - ${room}`);
    // });

    socket.emit('myid', socket.id);

    socket.on('message', (data) => {
      log.info(`socket message ${JSON.stringify(data)}`);
      const roomID = _.get(data, 'roomID');
      const msg = _.omit(data, 'roomID');
      const message = { serverTime: new Date(), ...msg };
      log.info(`server-message ${JSON.stringify(message)}`);
      socket.to(roomID).emit('server-message', message);
    });

    socket.on('join-room', (data) => {
      const roomID = _.get(data, 'roomID', '');
      log.info(`socket join-room ${JSON.stringify(data)}`);
      if (isUUID(roomID, 4)) {
        socket.join(roomID);
        socket.emit('joined-room', { roomID });
      } else {
        socket.emit('invalid-room', { invalid: true });
      };
    });

    socket.on('create-room', (data) => {
      log.info(`socket create-room - ${JSON.stringify(data)}`);
      const roomID = crypto.randomUUID();
      socket.emit('new-room', { roomID });
    });

    if (store) {
      streamIO(socket, io, store);
    }


  });
}
