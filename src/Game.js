import React, { useEffect } from 'react';
import {useState} from 'react';
import GameEstimate from './GameEstimate.js';
import GameAnswer from './GameAnswer.js';

function Game() {

    const [gameState, setGameState] = useState(1);

    const [answerProps, setAnswerProps] = useState({
        "userAnswer": null,
        "correctAnswer": null,
        "tolerance": null,
        "correct": null
    });

    const [score, setScore] = useState(0);

    function renderWindow(){
        switch(gameState){
            case 0:
            case 1:
                return <GameEstimate
                            setGameState={setGameState}
                            setAnswerProps={setAnswerProps} 
                            score={score}
                            setScore={setScore}
                        />
            case 2:
                return <GameAnswer
                            setGameState={setGameState}
                            answerProps={answerProps}
                            score={score}
                        />
            default:
                return null;
        }
    }

    return(
        renderWindow()
    );
}

export default Game;
