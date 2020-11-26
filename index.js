var path= require('path');
var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname,'public')));

http.listen(3000, () => {
    console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg);
    });
    socket.on('chat typing', (msg) => {
        console.log(msg);
        socket.broadcast.emit('chat typing', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected',socket.id);
    });
});

