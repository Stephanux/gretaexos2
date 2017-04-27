module.exports = function(io) {
    io.on('connection', function(socket) {
        console.log('client connected', socket);
        socket.on('GET', function(data) {
            GLOBAL.schemas[data].find({}, function(err, result) {
                if (err) {
                    throw err;
                }
                //console.log(result);
                socket.emit('RESULT', JSON.stringify(result));
            });
        });

    });
}
