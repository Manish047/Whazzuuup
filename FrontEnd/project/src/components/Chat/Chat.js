import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import queryString from 'query-string';
import classes from './Chat.module.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = props => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'YOUR_HOSTED_SERVER_URL_OR_RUN_ON_LOCALHOST/';
    // const ENDPOINT = 'http://localhost:5000/';

    // Runs everytime component renders
    useEffect(() => {
        const { name, room } = queryString.parse(props.location.search);
        socket = io(ENDPOINT, { transports: ['websocket'] });
        setName(name);
        setRoom(room);
        socket.emit('join', { name: name, room: room }, error => {
            if (error) {
                props.history.replace('/');
                alert(error);
            }
        });
        // Unmounting
        return () => {
            socket.emit('endSession');
            socket.off('join');
            socket.off('endSession');
        }
    }, [ENDPOINT, props.location.search, props.history]);

    // Listening for events fired by server
    useEffect(() => {
        socket.on('message', message => {
            setMessages(prevMessages => [...prevMessages, message]);
        })
        socket.on('roomData', ({ users }) => {
            setUsers(users);
        })
        // Unmounting
        return () => {
            socket.emit('endSession');
            socket.off('join');
            socket.off('message');
            socket.off('roomData');
            socket.off('endSession');
        }
    }, []);

    // Function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            const msg = message;
            setMessage('');
            socket.emit('sendMessage', { message: msg }, error => {
                if (error) {
                    props.history.replace('/');
                    alert(error);
                }
            });
        }
    }

    // To terminate the session
    const endSession = () => {
        socket.emit('endSession');
        props.history.replace('/');
    }

    return (
        <div className={classes.Chat}>
            <div className={classes.Content}>
                <InfoBar room={room} users={users} endSession={endSession} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}

export default Chat;
