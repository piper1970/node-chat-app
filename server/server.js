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

  socket.on('createMessage', (msg) => {
    console.log('createMessage', msg);

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
