import React from 'react';

function Alert(props) {
    const myClass = "card card-body text-white bg-" + props.status;
    return (
        <div className={myClass} role="alert">
            {props.message}
        </div>
    )
}

export default Alert;