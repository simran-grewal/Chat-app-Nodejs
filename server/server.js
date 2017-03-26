const path = require('path');
const http = require('http'); // we r going to creat server using http
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

  io.on('connection', (socket) => { // when ever user connected to app this message will be displayed

  console.log('New user connected');


    socket.emit('newMessage', {
      from: 'simrangrewal587@gmail.com',
      text: 'this is my first Socket.io app',
      createdAt: new Date()
    });


  socket.on('createMessage', (message) =>{
    console.log(message);
  })
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});



server.listen(port, () => {
  console.log(`server is up on port ${port}`)
});
