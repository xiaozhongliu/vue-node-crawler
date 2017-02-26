module.exports = {
    initSocket(server) {
        let socket = null;
        require('socket.io')(server).on('connection', instance => {
            console.log('socket connection established');
            socket = instance;
        });
        this.broadcast = message => {
            socket && socket.emit('broadcast', message)
        }
    },
    broadcast: null
};