import React from 'react';
import { connect } from 'react-redux';
import TextQuestion from './TextQuestion';
import { setFlavor } from '../redux/flavor';

import './FlavorQuestion.css';

const FlavorQuestion = ({
    number, 
    text, 
    flavor, 
    connectProps, 
    flavorAnswer, 
    onFlavorChange}) => 
<div className='flavor-question'>
    <div className='question-number'>{number}.</div>
    <div className='question-body'>
        <label>{text}</label>
        <textarea 
            onChange={onFlavorChange}
            value={flavorAnswer}></textarea>
        <TextQuestion
            number={`${number}a`}
            text={flavor}
            connectProps={connectProps}
        />
    </div>
    <div className='clear-fix'></div>
</div>;

export default connect(
    (state, { connectProps }) => ({
        flavorAnswer: state.flavor && state.flavor[connectProps.field]
    }),
    (dispatch, { connectProps }) => ({
        onFlavorChange: event => 
            dispatch(setFlavor(connectProps.field, event.target.value))
    })
)(FlavorQuestion);