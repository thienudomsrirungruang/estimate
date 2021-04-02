import React, {useState} from 'react';
import './App.css';
import Game from './Game.js';
import TopBar from './TopBar.js';

function App() {
    const [topBarPercent, setTopBarPercent] = useState(0.5)
    return (
        <div id="window">
            <TopBar
                topBarPercent={topBarPercent}
            />
            <Game
                setTopBarPercent={setTopBarPercent}
            />
        </div>
    );
}

export default App;
