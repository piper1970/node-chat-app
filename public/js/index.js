'use strict'

var socket = io();

socket.on('connect', function(){
  console.log('connect');
});

socket.on('disconnect', function() {
  console.log('disconnect');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
  var li = $('<li></li>');
  li.text(message.from + ": " + message.text);
  $('#messages').append(li);
});

$('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function(error, acknowledgement){
    if(error){
      // display in error window
      console.log('Errors occurred: ' + error);
      return;
    }
    //display message at the bottom of the chat listen
    console.log(acknowledgement);
  });
});
