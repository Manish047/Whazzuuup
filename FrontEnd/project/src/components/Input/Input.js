import React from 'react';
import classes from './Input.module.css';

const Input = props => {
    return (
        <form className={classes.Form}>
            <input
                type="text"
                value={props.message}
                placeholder="Type a message..."
                className={classes.Input}
                onChange={event => props.setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? props.sendMessage : null}
            />
            <button className={classes.SendButton} onClick={props.sendMessage}>
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
        </form>
    );
}

export default React.memo(Input);