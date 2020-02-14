import React from 'react';
import {useState, useEffect, useRef} from 'react';
import gameData from './gameData.json';
import './GameEstimate.css';

function GameEstimate(props) {
    const [question, setQuestion] = useState(gameData.questions[Math.floor(Math.random() * gameData.questions.length)]);
    const [answerInput, setAnswerInput] = useState("");

    const setGameState = props.setGameState
    const setAnswerProps = props.setAnswerProps
    const score = props.score
    const setScore = props.setScore

    const inputBox = useRef(null);

    const setTopBarPercent = props.setTopBarPercent

    const [startTimestamp, setStartTimestamp] = useState(Date.now());

    function validateAnswer(){
        var userAnswer = parseFloat(answerInput)
        var lowerBound = question.answer / question.tolerance
        var upperBound = question.answer * question.tolerance
        var correct = lowerBound <= userAnswer && userAnswer <= upperBound
        if(correct){
            setScore(score + 1)
        }
        return correct
    }

    function handleInputKeyDown(e){
        if(e.key === "Enter"){
            var correct = validateAnswer();
            setAnswerProps({
                "userAnswer": answerInput,
                "correctAnswer": question.answer,
                "tolerance": question.tolerance,
                "correct": correct
            })
            setGameState(2);
            // changeQuestion();
            // setAnswerInput("");
        }
    }

    useEffect(() => {
        inputBox.current.focus();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            var millis = 15000 - Date.now() + startTimestamp;
            setTopBarPercent(millis / 15000);
        }, 30);
    });

    return(
        <div id="game">
            <center>
                <p>{question.title} in {question.unit}</p>
                <input
                    ref={inputBox}
                    type="text"
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                />
            </center>
        </div>
    )
}

export default GameEstimate;
