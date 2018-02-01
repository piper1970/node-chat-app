'use strict'

var socket = io();

socket.on('connect', function(){
  console.log('connect');

  socket.emit('createMessage', {
    from: 'George@George.com',
    text: 'Hey, this aint my name!'
  });

});

socket.on('disconnect', function() {
  console.log('disconnect');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
})
