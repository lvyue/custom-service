/**
 * 
 */
const _ = require('lodash');
const customers = new Map();

exports.bind = function (io) {
    io.use((socket, next) => {
        console.log(socket.request.headers.cookie);
        return next();
    });
    io.on('connection', function (socket) {
        let user = {
            socket
        };
        // clear
        customers.set(socket.id, user);
        console.log(customers.size);
        console.log(socket.id);
        socket.emit('msg', { msg: 'Hello world !' });
        socket.on('message', function (msg) {
            socket.emit('msg', { msg: msg });
        });
        socket.on('disconnect', function (socket) {
            console.log('delete socket', socket);
        });
    });
};