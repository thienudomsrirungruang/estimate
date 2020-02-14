import React from 'react';
import {useEffect, useState} from 'react';
import './GameAnswer.css';


function GameAnswer(props) {

    const [enterKeyUp, setEnterKeyUp] = useState(false);

    const answerProps = props.answerProps;
    const score = props.score;
    const setGameState = props.setGameState;

    function downHandler({key}) {
        if (key === "Enter") {
            if(enterKeyUp){
                setGameState(1);
            }
        }
    }

    function upHandler({key}) {
        if (key === "Enter") {
            setEnterKeyUp(true);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler)
        return () => {
          window.removeEventListener('keydown', downHandler);
          window.removeEventListener('keyup', upHandler);
        };
    }, [enterKeyUp]); // Empty array ensures that effect is only run on mount and unmount

    return(
        <center>
            <p className="bigText">
                {answerProps.correct ? "Correct!" : "Incorrect!"}
            </p>
            <p className="bodyText">
                {"Correct answer: " + answerProps.correctAnswer}
            </p>
            <p className="bodyText">
                {"Your answer: " + answerProps.userAnswer}
            </p>
            <p className="bodyText">
                {"Tolerance: " + answerProps.tolerance}
            </p>
            <p className="bodyText">
                {"Score: " + score}
            </p>
            <p id="continueMsg">
                Press enter to continue
            </p>
        </center>
    );
}

export default GameAnswer;
