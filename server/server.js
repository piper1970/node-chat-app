'use strict'

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');



  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and room name are required');
    }else{
      socket.join(params.room);
      // socket.leave(params.room)

      // send message to user
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat channel'));

      // broadcasts to everyone but user who connected
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the chat room`));
      
      callback();
    }
  });



  socket.on('createMessage', (msg, callback) => {
    console.log('createMessage', msg);
    io.emit('newMessage', generateMessage(msg.from, msg.text));
    callback();
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
  });

  socket.on('createLocationMessage', (coords) => {
    console.log(coords);
    io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude, coords.longitude));
  })

});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
