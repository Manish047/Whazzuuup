import React from 'react';
import classes from './InfoBar.module.css';

const InfoBar = props => {
    return (
        <div className={classes.InfoBar}>
            <div className={classes.Logo}>
            <i className="fa fa-whatsapp" aria-hidden="false"></i>
            </div>
            <div className={classes.Title}>
                <p className={classes.Heading}>{props.room}</p>
                <div className={classes.Users}>
                    {props.users.map((user, index) => {
                        return <span key={user.id}>
                            {user.name + (index === props.users.length - 1 ? '' : ', ')}
                        </span>
                    })}
                </div>
            </div>
            <button className={classes.CloseButton} onClick={props.endSession}>
                Logout
            </button>
        </div>
    );
}

export default React.memo(InfoBar);