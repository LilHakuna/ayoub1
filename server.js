const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));  // Serve static files (your game files)

let rooms = {};  // Store game rooms

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  socket.on('joinRoom', (room) => {
    if (!rooms[room]) {
      rooms[room] = { players: [] };
    }
    rooms[room].players.push(socket.id);
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);

    if (rooms[room].players.length === 2) {
      io.to(room).emit('startGame', 'Game starting...');
    }
  });

  socket.on('move', (data) => {
    io.to(data.room).emit('move', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected: ' + socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
