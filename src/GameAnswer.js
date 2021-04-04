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

    // upThreshold/downThreshold: order of magnitude to use scientific
    function formatNumber(number, precision, upThreshold, downThreshold) {
        number = Number(number.toPrecision(precision));
        if(number < Math.pow(10, downThreshold) || number >= Math.pow(10, upThreshold)){
            var oom = Math.floor(Math.log(number) / Math.log(10));
            var magnitude = (number / Math.pow(10, oom)).toPrecision(precision);
            return magnitude + "e" + oom;
        }
        return number;
    }
    
    return(
        <center>
            <p className="bigText">
                {answerProps.outOfTime ? "Out of Time!" : (answerProps.correct ? "Correct!" : "Incorrect!")}
            </p>
            <p className="bodyText">
                {"Correct answer: " + formatNumber(answerProps.correctAnswer, 5, 6, -3)}
            </p>
            <p className="bodyText" style={{"display": (answerProps.outOfTime ? "none" : "initial")}}>
                {"Your answer: " + formatNumber(answerProps.userAnswer, 5, 6, -3)}
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
