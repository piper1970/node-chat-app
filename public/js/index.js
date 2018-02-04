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

socket.on('newLocationMessage', function(msg) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');

  li.text(`${msg.from}: `);
  a.attr('href', msg.url);

  li.append(a);
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
    $('[name=message]').val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function(e) {
  if(!navigator.geolocation){
    return alert('Geolocation services not supported on this browser');
  }
  navigator.geolocation.getCurrentPosition(function (position){
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (error){
    alert('Unable to fetch location');
  })
});
