import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './JoinRoom.module.css';

const JoinRoom = props => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className={classes.JoinRoom}>
            <div className={classes.Content}>
                <h1 className={classes.Heading}>Create a Chat Room</h1>
                <hr className={classes.Seperator}></hr>
                <input placeholder="Name" className={classes.Input} type="text" onChange={(event) => setName(event.target.value)} />
                <input placeholder="Room" className={classes.Input} type="text" onChange={(event) => setRoom(event.target.value)} />
                <Link className={classes.Button} onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    Sign In
                </Link>
            </div>
        </div>
    );
}

export default JoinRoom;