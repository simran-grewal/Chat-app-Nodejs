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
    from: 'Admin',
    text: 'Welcome to ChatRoom',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admit',
    text: 'newUser joined',
    createAt: new Date().getTime()
  })

  socket.on('createMessage', (message) =>{
    console.log('createMessage', message);
    io.emit('newMessage', {
      from : message.from,
      text : message.text,
      createdAt: new Date().getTime()
    })

      // socket.broadcast.emit('newMessage', {
      //   from: message.from,
      //   text: message.text,
      //   createdAt: new Date().getTime()
      // })


  });



  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});



server.listen(port, () => {
  console.log(`server is up on port ${port}`)
});
