import React from 'react';
import {useEffect} from 'react';
import './GameAnswer.css';


function GameAnswer(props) {

    const answerProps = props.answerProps;
    const score = props.score;
    const setGameState = props.setGameState;

    function downHandler({key}) {
        if (key === "Enter") {
            setGameState(1);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        return () => {
          window.removeEventListener('keydown', downHandler);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

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
