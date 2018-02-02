'use strict'

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  // send message to user
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat channel',
    createdAt: new Date().getTime()
  });

  // broadcasts to everyone but user who connected
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user has joined the chat room',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (msg) => {
    console.log('createMessage', msg);

    // broadcast  to everyone on the system
    io.emit('newMessage', {
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
  });

});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
