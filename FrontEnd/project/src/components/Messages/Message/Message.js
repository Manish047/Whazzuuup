import React from 'react';

import classes from './Message.module.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {

  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  let message = (
    isSentByCurrentUser
      ? (
        <div className={[classes.UserMessage].join(' ')}>
          <p className={classes.UserName}>{trimmedName}</p>
          <div className={classes.UserMessageBox}>
            <p className={classes.UserMessageText}>{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )
      : (
        <div className={[classes.RecievedMessage].join(' ')}>
          <div className={classes.RecievedMessageBox}>
            <p className={classes.RecievedMessageText}>{ReactEmoji.emojify(text)}</p>
          </div>
          <p className={classes.RecievedUserName}>{user}</p>
        </div>
      )
  );

  if (user === 'admin') {
    message = <div className={classes.AdminMessage}>{text}</div>
  }

  return message;
}

export default React.memo(Message);