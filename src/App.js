import React from 'react';
import './App.css';
import Game from './Game.js';
import TopBar from './TopBar.js';

function App() {
    return (
        <div id="window">
            <TopBar/>
            <Game/>
        </div>
    );
}

export default App;
