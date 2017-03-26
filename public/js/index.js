// iteating the request
var socket = io();
socket.on('connect', function()  {  //Inbuild eveent
  console.log('Connected to server');



  socket.emit('createMessage', {
    from: 'this is from simran',
    text: 'Well done !!'
  })
  socket.on('newMessage', function(message){
    console.log('new Message', message);
  })
});


socket.on('disconnect', function() { //Inbuild eveent
  console.log('Disconnected from server');
});

socket.on('newEmail', function(email) { // custom event
  console.log('New Email', email);
})
