const path = require('path');
const http = require('http'); // we r going to creat server using http
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
var {generateMessage, generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

  io.on('connection', (socket) => { // when ever user connected to app this message will be displayed

  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

  socket.on('createMessage', (message, callback) =>{

    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
     callback();

  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});



server.listen(port, () => {
  console.log(`server is up on port ${port}`)
});
