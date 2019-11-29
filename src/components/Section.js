import React from 'react';
import NonQuestion from './NonQuestion';
import TextQuestion from './TextQuestion';
import FlavorQuestion from './FlavorQuestion';
import DiceRollQuestion from './DiceRollQuestion';
import ToggleQuestion from './ToggleQuestion';
import { questionsInSection } from '../data/questions';
import { connectAnswers } from '../redux/answers';

import './Section.css';

const questionMap = {
    'text': q => <TextQuestion 
        key={q.name}
        number={q.number} 
        text={q.text} 
        connectProps={connectAnswers(q.name)} />,
    'readOnly': q => <TextQuestion 
        key={q.name || q.text}
        number={q.number} 
        text={q.text} 
        readOnly={true}
        sourceField={q.sourceField} />,
    'textOnly': q => <NonQuestion 
        key={q.name || q.text}
        number={q.number} 
        text={q.text} />,
    'textWithFlavor': q => <FlavorQuestion
        key={q.name}
        number={q.number} 
        text={q.text} 
        flavor={q.flavor} 
        connectProps={connectAnswers(q.name)} />,
    'dice': q => <DiceRollQuestion
        key={q.name}
        name={q.name}
        number={q.number}
        text={q.text}
        dieFaces={q.dieFaces} 
        choices={q.choices} />,
    'toggle': q => <ToggleQuestion
        key={q.name}
        name={q.name}
        number={q.number}
        text={q.text}
        toggleText={q.toggleText}
        activeValue={q.activeValue}
        connectProps={connectAnswers(q.name)} />
}

export default ({name, number, title, instructions, missingQuestions, children}) => {
    const questions = questionsInSection(name);

    return <div className="section">
        <div className="section-intro">
            <h2>Section {number}: {title}</h2>
            <p className="instructions">
                {instructions}
            </p>
        </div>
        <div>{questions.map(q => questionMap[q.type] && questionMap[q.type](q))}</div>
        {children}
    </div>;
};
