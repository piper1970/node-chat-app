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

  socket.emit('newMessage', {
    from: 'Steve@Steve.com',
    text: "The real thing",
    createdAt: new Date()
  });

  socket.on('createMessage', (msg) => {
    msg.createdAt = new Date();
    console.log('createMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
  });

});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
