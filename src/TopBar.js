import React from 'react';
import './TopBar.css';

function TopBar(props) {

    const topBarPercent = props.topBarPercent;

    const topBarStyle = {
        width: topBarPercent * 100 + "%"
    };

    return (
        <div id="bar-wrapper">
            <div id="bar" style={topBarStyle}></div>
        </div>
    );
}

export default TopBar;
