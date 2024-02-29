const { _, log } = require('../utils');

module.exports = (socket, io, store) => {
    socket.on('peer-id', (data) => {
        const { roomID, peerID } = data;
        log.info(`peer-id ${roomID} ${socket.id}`);
        if (!peerID) {
            return;
        }
        store.addPeerSocket(socket, {
            roomID,
            peerID
        });
        log.info(`sending new-peer-id to - ${roomID}`);

        socket.to(roomID).emit('new-peer-signal', { id: socket.id, peerID });
    });

    socket.on('get-peer-list', (data) => {
        const roomID = _.get(data, 'roomID');
        log.info(`get-peer-list ${roomID}, ${JSON.stringify(data)}`);
        const rooms = _.get(io, `adapter.rooms`, new Map());
        const sockets = rooms.get(roomID) || [];
        let peerlist = [];
        sockets.forEach(id => {
            const peerID = store.getPeerSocket(id);
            if (!peerID) return;
            peerlist.push({ id, peerID });
        });
        log.info(`sending peer list ${JSON.stringify(peerlist)}`);
        socket.emit('peer-list', peerlist);
    });
}