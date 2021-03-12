const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const router = require('./router');
const { addUser, removeUser, getUser, getUsersInGroup } = require('./models/users');
const app = express();

app.use(cors());
app.use(router);

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Server Started!');
    const io = socketio(server);
    // Runs after the connection will be opened
    io.on('connection', (socket) => {
        socket.on('join', (args, callback) => {
            // De-Structuring name and room from the args object
            const { name, room } = args;
            // Adding user
            const { user, error } = addUser({ id: socket.id, name: name, room: room });
            // If error, inform user
            if (error) {
                return callback(error);
            }
            // Emitting event to the front end
            socket.emit('message', { user: 'admin', text: `Welcome ${user.name}!` });
            // Emitting event for everyone on a room to the client
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} joined.` });
            // Subscribe the socket to a given channel
            socket.join(user.room);
            // Letting everyone know how many users are there in the group
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInGroup(user.room) });
            // Run callback
            callback(null);
        });
        socket.on('sendMessage', (args, callback) => {
            // De-Structuring sent message from args object
            const { message } = args;
            // Get the user
            const { user, error } = getUser(socket.id);
            if (error) {
                return callback(error);
            }
            // Emit back event on user specific room only to the front end
            io.to(user.room).emit('message', { user: user.name, text: message });
            // Run callback
            callback(null);
        });
        socket.on('endSession', () => {
            const user = removeUser(socket.id);
            if (user) {
                io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
                io.to(user.room).emit('roomData', { room: user.room, users: getUsersInGroup(user.room) });
            }
        })
        socket.on('disconnect', () => {
            const user = removeUser(socket.id);
            if (user) {
                io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
                io.to(user.room).emit('roomData', { room: user.room, users: getUsersInGroup(user.room) });
            }
        });
    });
})

