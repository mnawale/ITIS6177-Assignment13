const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.get('/hello', (req, res) => {
  res.send('<h1>Hello world</h1>');
});
// Get HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
// Socket connection
io.on('connection', (socket) => {
  console.log('a user connected');
});
// Disconnect event
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
//Message event
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});
//Emit event
io.emit('some event', { 
    someProperty: 'some value', otherProperty: 'other value' 
});
io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
// Server listening
server.listen(3000, () => {
  console.log(' App listening on port:3000');
});
