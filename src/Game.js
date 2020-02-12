import React from 'react';
import {useState} from 'react';
import gameData from './gameData.json';
import './Game.css';

function Game() {
    const [question, setQuestion] = useState(gameData.questions[Math.floor(Math.random() * gameData.questions.length)]);
    const [answerInput, setAnswerInput] = useState("");

    function changeQuestion(){
        setQuestion(gameData.questions[Math.floor(Math.random() * gameData.questions.length)]);
    }

    function validateAnswer(){
        console.log("your answer: " + answerInput);
        console.log("correct answer: " + question.answer)
    }

    function handleInputKeyDown(e){
        if(e.key === "Enter"){
            validateAnswer();
            changeQuestion();
            setAnswerInput("");
        }
    }

    return(
        <div id="game">
            <center>
                <p>{question.title} in {question.unit}</p>
                <input
                    type="text"
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                />
            </center>
        </div>
    )
}

export default Game;
