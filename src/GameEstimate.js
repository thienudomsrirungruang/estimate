import React from 'react';
import {useState, useEffect, useRef} from 'react';
import gameData from './gameData.json';
import './GameEstimate.css';

function GameEstimate(props) {
    const [answerInput, setAnswerInput] = useState("");
    const [exponentInput, setExponentInput] = useState("");

    const setGameState = props.setGameState
    const setAnswerProps = props.setAnswerProps
    const score = props.score
    const setScore = props.setScore

    const inputBox = useRef(null);

    const setTopBarPercent = props.setTopBarPercent

    const [startTimestamp, setStartTimestamp] = useState(Date.now());

    const [question, setQuestion] = useState({
        "title": "",
        "unit": "",
        "answer": "",
        "tolerance": 0
    });

    useEffect(() => {
        var quantity = gameData.quantities[Math.floor(Math.random() * gameData.quantities.length)];
        var unit = gameData.units[Math.floor(Math.random() * gameData.units.length)];
        setQuestion({
            "title": quantity.name,
            "unit": unit.name,
            "answer": quantity.answer / unit.equivalent,
            "tolerance": 10
        });
    }, []);

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
                "userAnswer": (answerInput === "" ? 1 : answerInput) * Math.pow(10, (exponentInput === "" ? 0 : exponentInput)),
                "correctAnswer": question.answer,
                "tolerance": question.tolerance,
                "correct": correct,
                "outOfTime": false
            })
            setGameState(2);
            // changeQuestion();
            // setAnswerInput("");
        }
    }

    function outOfTime(){
        var correct = validateAnswer();
            setAnswerProps({
                "userAnswer": NaN,
                "correctAnswer": question.answer,
                "tolerance": question.tolerance,
                "correct": correct,
                "outOfTime": true
            })
            setGameState(2);
    }

    useEffect(() => {
        inputBox.current.focus();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            var millis = 15000 - Date.now() + startTimestamp;
            if(millis < 0){
                outOfTime();
            }
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
                ×10^
                <input
                    type="text"
                    value={exponentInput}
                    onChange={(e) => setExponentInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                />
            </center>
        </div>
    )
}

export default GameEstimate;
