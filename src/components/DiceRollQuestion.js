import React from 'react';
import { connect } from 'react-redux';
import getSelectedDiceRollChoice from '../lib/getSelectedDiceRollChoice';
import { setDiceRoll } from '../redux/diceRolls';
import { getAnswer } from '../redux/answers';

import './TextQuestion.css';
import './DiceRollQuestion.css';

const numberText = choice => choice.ranges.map(range => {
    if (typeof range === 'number') {
        return `${range}`;
    }

    if (Array.isArray(range)) {
        return `${range[0]}-${range[1]}`;
    }

    return '';
}).join(', ');

const DiceRollQuestion = ({
    number,
    text,
    dieFaces,
    choices,
    rollDice,
    rolledNumber}) => {
        const selectedChoice = getSelectedDiceRollChoice(choices, rolledNumber);

        const table = <table className="dice-roll-table">
            <tbody>
            {choices.map((choice, i) => {
                const selected = choice === selectedChoice;

                return <tr className={selected ? ' selected' : ''} key={i}>
                    <td className='number-text'>{numberText(choice)}{
                        selected ? ` (rolled ${rolledNumber})` : ''
                    }</td>
                    <td className='description'>{choice.text}</td>
                </tr>;
            })}
            </tbody>
        </table>;

        return <div className="text-question">
            <div className="question-number">{number}.</div>
            <div className="question-body">
                <label>{text}</label>
                <p>
                    <button className="roll-dice" onClick={rollDice}><div>
                        Roll a d{dieFaces}
                    </div></button>
                </p>
                {table}
            </div>
            <div className="clear-fix"></div>
        </div>
    };

const rollDice = max => 1 + Math.floor(Math.random() * Math.floor(max));

const buildChoiceValues = (state, choices) => choices.map(choice => {
    if (!choice.sourceField) {
        return '';
    }

    return getAnswer(state, choice.sourceField);
});

export default connect(
    (state, { name, choices }) => ({
        rolledNumber: (state.diceRolls && state.diceRolls[name]) || 0,
        choiceValues: buildChoiceValues(state, choices)
    }),
    (dispatch, { dieFaces, name }) => ({
        rollDice: () => dispatch(setDiceRoll(name, rollDice(dieFaces)))
    })
)(DiceRollQuestion);