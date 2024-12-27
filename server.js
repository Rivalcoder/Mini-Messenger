const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ["http://localhost:3000","https://private-chatroom.vercel.app"],
        methods: ["GET", "POST"]
    }
});

app.use(cors());

const rooms = {};
const messages = {};

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', ({ username, room }) => {
        if (!rooms[room]) {
            rooms[room] = [];
            messages[room] = []; // Initialize message array for the room
        }
        rooms[room].push(username);
        socket.join(room);
        socket.room = room;
        socket.username = username;

        // Send previous messages to the user
        socket.emit('previousMessages', messages[room]);

        io.to(room).emit('message', { user: 'admin', text: `${username} has joined the room.` });
    });

    socket.on('sendMessage', (message) => {
        const msg = { user: socket.username, text: message };
        messages[socket.room].push(msg); // Store the message
        io.to(socket.room).emit('message', msg);
    });

    socket.on('disconnect', () => {
        if (socket.room && rooms[socket.room]) {
            rooms[socket.room] = rooms[socket.room].filter(user => user !== socket.username);
            if (rooms[socket.room].length === 0) {
                delete rooms[socket.room];
                delete messages[socket.room]; // Clear messages when room is empty
            } else {
                io.to(socket.room).emit('message', { user: 'admin', text: `${socket.username} has left the room.` });
            }
        }
        console.log('Client disconnected');
    });
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));