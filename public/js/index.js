'use strict'

var socket = io();

socket.on('connect', function(){
  console.log('connect');
});

socket.on('disconnect', function() {
  console.log('disconnect');
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  console.log('newMessage', message);
  var li = $('<li></li>');
  li.text(message.from + " " + formattedTime + ": " + message.text);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(msg) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  var formattedTime = moment(msg.createdAt).format('h:mm a');

  li.text(msg.from + ' ' + formattedTime + ': ');
  a.attr('href', msg.url);

  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit', function(e){
  e.preventDefault();
  const messageTextbox = $('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(error, acknowledgement){
    if(error){
      // display in error window
      console.log('Errors occurred: ' + error);
      return;
    }
    //display message at the bottom of the chat listen
    console.log(acknowledgement);
    nameField.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function(e) {
  if(!navigator.geolocation){
    return alert('Geolocation services not supported on this browser');
  }
  const originalText = locationButton.text();
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position){
    console.log(position);
    locationButton.removeAttr('disabled').text(originalText);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (error){
    alert('Unable to fetch location');
    locationButton.removeAttr('disabled').text(originalText);
  })
});
