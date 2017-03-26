// iteating the request
var socket = io();
socket.on('connect', function()  {  //Inbuild eveent
  console.log('Connected to server');
});


socket.on('newMessage', function(message){
  console.log(message);
})

socket.on('disconnect', function() { //Inbuild eveent
  console.log('Disconnected from server');
});
