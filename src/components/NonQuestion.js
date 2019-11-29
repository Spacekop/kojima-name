import React from 'react';
import './TextQuestion.css';

const NonQuestion = ({number, text}) => 
<div className="text-question">
    <div className="question-number">{number}.</div>
    <div className="question-body">
        <label>{text}</label>
    </div>
    <div className="clear-fix"></div>
</div>;

export default NonQuestion;