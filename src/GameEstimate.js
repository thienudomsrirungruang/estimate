import React from 'react';
import {useState, useEffect, useRef} from 'react';
import gameData from './gameData.json';
import './GameEstimate.css';
import {rand, parseUnit, arrayEquals, arrayContains, arrayMinus, arrayScalarMult} from './Utils.js';

function GameEstimate(props) {
    const [answerInput, setAnswerInput] = useState("");
    const [exponentInput, setExponentInput] = useState("");

    const setGameState = props.setGameState;
    const setAnswerProps = props.setAnswerProps;
    const score = props.score;
    const setScore = props.setScore;

    const inputBox = useRef(null);

    const setTopBarPercent = props.setTopBarPercent;

    const [startTimestamp, setStartTimestamp] = useState(Date.now());

    const [question, setQuestion] = useState({
        "title": "",
        "unit": "",
        "answer": "",
        "tolerance": 0
    });

    function getUnitCombination(unit){
        // try eliminating units recursively
        if(arrayEquals(unit, [0, 0, 0, 0, 0, 0, 0])){
            console.log("base case");
            return [new Map(), 1.0];
        }
        // gameData.units.forEach(x => {
        for(var i = 0; i < gameData.units.length; i++){
            var x = gameData.units[i];
            var xunit = parseUnit(x.unit);
            console.log("xunit, unit");
            console.log(xunit, unit);
            if(arrayContains(xunit, unit)){
                console.log("contains pass");
                for(var i = 0; i < 7; i++){
                    if(unit[i] % xunit[i] == 0){
                        console.log("i=" + i);
                        var power = unit[i] / xunit[i];
                        var subtractedUnit = arrayMinus(unit, arrayScalarMult(xunit, power));
                        console.log(subtractedUnit);
                        const [u, factor] = getUnitCombination(subtractedUnit);
                        console.log("u, factor");
                        console.log(u, factor);
                        var rf = u;
                        rf.set(x, power);
                        console.log("unit, rf");
                        console.log(unit, rf);
                        return [rf, factor * Math.pow(x.value, power)];
                    }
                }
            }
        };
        return [undefined, undefined];
    }

    function getExponent(exp){
        switch(exp){
            case 1: return "";
            case 2: return " squared";
            case 3: return " cubed";
            default: return " to the power of " + exp;
        }
    }

    function nameUnit(u){
        var positiveBaseUnits = [];
        var negativeBaseUnits = [];
        for(var i = 0; i < gameData.units.length; i++){
            if(u.has(gameData.units[i])){
                if(u.get(gameData.units[i]) > 0){
                    positiveBaseUnits.push({"unit": gameData.units[i], "multiplier": u.get(gameData.units[i])});
                }
                else{
                    negativeBaseUnits.push({"unit": gameData.units[i], "multiplier": u.get(gameData.units[i])});
                }
            }
        }

        var out = "";
        for(var i = 0; i < positiveBaseUnits.length; i++){
            var b = positiveBaseUnits[i];
            if(i != positiveBaseUnits.length - 1){
                out += b.unit.name;
                out += getExponent(b.multiplier);
                out += "-";
            }
            else{
                out += b.unit.plural;
                out += getExponent(b.multiplier);
            }
        }

        if(negativeBaseUnits.length > 0){
            out += " per ";
            for(var i = 0; i < negativeBaseUnits.length; i++){
                var b = negativeBaseUnits[i];
                if(i != negativeBaseUnits.length - 1){
                    out += b.unit.name;
                    out += getExponent(-b.multiplier);
                    out += "-";
                }
                else{
                    out += b.unit.name;
                    out += getExponent(-b.multiplier);
                }
            }
        }

        return out;
    }

    useEffect(() => {
        var quantity = gameData.quantities[rand(gameData.quantities.length)];
        // var unit = gameData.units[rand(gameData.units.length)];
        console.log(parseUnit(quantity.unit));
        const [u, factor] = getUnitCombination(parseUnit(quantity.unit));
        console.log(u, factor);
        var unit = nameUnit(u);
        setQuestion({
            "title": quantity.name,
            "unit": unit,
            "answer": quantity.value / factor,
            "tolerance": 10
        });
    }, []);

    function validateAnswer(userAnswer){
        // var userAnswer = parseFloat(answerInput) * 10 ** parseFloat(exponentInput);
        var lowerBound = question.answer / question.tolerance;
        var upperBound = question.answer * question.tolerance;
        console.log(lowerBound);
        console.log(upperBound);
        console.log(userAnswer);
        var correct = lowerBound <= userAnswer && userAnswer <= upperBound;
        if(correct){
            setScore(score + 1);
        }
        return correct;
    }

    function handleInputKeyDown(e){
        if(e.key === "Enter"){
            var userAnswer = (answerInput === "" ? 1 : answerInput) * Math.pow(10, (exponentInput === "" ? 0 : exponentInput));
            var correct = validateAnswer(userAnswer);
            setAnswerProps({
                "userAnswer": userAnswer,
                "correctAnswer": question.answer,
                "tolerance": question.tolerance,
                "correct": correct,
                "outOfTime": false
            });
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
        });
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
