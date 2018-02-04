'use strict'

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  // send message to user
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat channel'));

  // broadcasts to everyone but user who connected
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined the chat room'));

  socket.on('createMessage', (msg) => {
    console.log('createMessage', msg);

    // broadcast  to everyone on the system
    io.emit('newMessage', generateMessage(msg.from, msg.text));
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
  });

});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
