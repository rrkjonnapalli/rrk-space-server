class DataService {

    __peerSocketMap = new Map();

    addPeerSocket = (socket, data) => {
        const { peerID } = data;
        this.__peerSocketMap.set(socket.id, peerID);
    }

    removePeerSocket = (socket) => {
        this.__peerSocketMap.delete(socket.id);
    }

    getPeerSocket = (id) => {
        return this.__peerSocketMap.get(id);
    }
}

module.exports = {
    DataService
};