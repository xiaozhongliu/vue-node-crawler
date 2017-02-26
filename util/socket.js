module.exports = server => {
    require('socket.io')(server).on('connection', instance => {
        console.log('A socket client connected');
        global.broadcast = message => {
            instance.emit('broadcast', message)
        }
    })
};