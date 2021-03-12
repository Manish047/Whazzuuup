import React from 'react';
import classes from './Messages.module.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom className={classes.Messages}>
      {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
    </ScrollToBottom>
  );
}

export default React.memo(Messages);