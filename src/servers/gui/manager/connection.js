var io,
    deviceConnections = [];


function init (socketio) {
    io = socketio;

    // connection event
    io.sockets.on('connection', function(socket) {

        socket.on('newHosting', function() {
            newHosting(socket);
        });

        socket.on('joinHosting', function(data) {
            joinHosting(socket, data);
        });
    });
}

function newHosting (socket) {

    var connectionId = Math.random().toString(36).substr(2, 4).toUpperCase(),
        room = io.sockets.adapter.rooms[connectionId];

    if (room === undefined) {
        socket.emit('newConnectionID', {
            connectionId: connectionId,
            mySocketId: socket.id
        });
        socket.join(connectionId);

        console.log('New hosting created : ' + connectionId);

        // we create new DeviceConnection
        //deviceConnections[connectionID] = new DeviceConnection(connectionID, onConnectionReadyCallback);
        //deviceConnections[connectionID].setDesktop(socket);

    } else {
        this.newHosting(socket);
    }
}

function joinHosting (socket, data) {
    console.log('JOIN HOSTING');

    var connectionID = data.connectionID,
        room = io.sockets.adapter.rooms[connectionID];

    if (room !== undefined) {
        socket.join(connectionID);
        deviceConnections[connectionID].setMobile(socket);
    } else {
        socket.emit('error', {errroType: -1, message: 'The room doesn\'t exist.'});
    }
}

module.exports = {
    init: init,
    newHosting: newHosting,
    joinHosting: joinHosting
};
