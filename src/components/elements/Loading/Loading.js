import React from 'react';

import './Loading.scss';

const Loading = (props) => {

    return (
        <div className="loading">
            <span className="ring" />
            <span className="ring" />
            <span className="ring" />
        </div>
    )
}

export default Loading;
