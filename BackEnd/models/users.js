const users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()
    const existingUser = users.find(user => user.room === room && user.name === name);
    if (existingUser) return { error: 'Username is taken' };
    const user = { id: id, name: name, room: room };
    users.push(user);
    return { user };
}

const removeUser = (id) => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex !== -1) {
        return users.splice(userIndex, 1)[0];
    }
}

const getUser = (id) => {
    const user = users.find(user => user.id === id);
    return user ? { user } : { error: 'User disconnected' };
}

const getUsersInGroup = (room) => {
    return users.filter(user => user.room === room)
}

module.exports = { addUser, removeUser, getUser, getUsersInGroup };