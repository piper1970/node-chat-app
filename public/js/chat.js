'use strict'

var socket = io();

function scrollToBottom () {
  // selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  // heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', function(){
  console.log('connect');
});

socket.on('disconnect', function() {
  console.log('disconnect');
});

socket.on('newMessage', function(message) {

  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    createdAt: formattedTime,
    from: message.from
  });
  $('#messages').append(html);
  scrollToBottom();

});

socket.on('newLocationMessage', function(msg) {

  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: msg.from,
    createdAt: formattedTime,
    url:msg.url
  });
  $('#messages').append(html);
  scrollToBottom();
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
    if(acknowledgement){
      console.log(acknowledgement);
    }
    messageTextbox.val('');
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
