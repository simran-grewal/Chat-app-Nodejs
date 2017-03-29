// iteating the request
var socket = io();
socket.on('connect', function()  {  //Inbuild eveent
  console.log('Connected to server');
});

socket.on('disconnect', function() { //Inbuild eveent
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
  console.log(message);
  var li  = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target = "_blank">My Current Location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTextbox = jQuery('[name = message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
      messageTextbox.val('');
  })
});


var locationButton = jQuery('#send-location');

    locationButton.on('click', function() {
      if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.');
      }

      locationButton.attr('disabled','disabled').text('Sending location...');
      navigator.geolocation.getCurrentPosition(function(positions){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
          latitude: positions.coords.latitude,
          longitude: positions.coords.longitude
        });
      }, function(){
          locationButton.removeAttr('disabled').text('Send location');
        alert('Not able to fetch the location');
      });
    });
