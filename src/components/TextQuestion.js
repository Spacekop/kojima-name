import React from 'react';
import { connect } from 'react-redux';
import { onChange } from '../lib/connectProps';
import getAnswerValue from '../lib/getAnswerValue';
import './TextQuestion.css';

const TextQuestion = ({number, text, answer, onChange, readOnly = false}) => 
<div className='text-question'>
    {number && <div className='question-number'>{number}.</div>}
    <div className='question-body'>
        <label>{text}</label>
        {readOnly
            ? <p className='read-only-answer'>{answer}</p>
            : <input type='text' value={answer} onChange={onChange} />
        }
    </div>
    <div className="clear-fix"></div>
</div>;

export default connect(
    (state, { connectProps, readOnly, sourceField, answer: ownAnswer }) => ({
        answer: ownAnswer || ((readOnly && sourceField) 
            ? getAnswerValue(state, sourceField)
            : connectProps.getter(state, connectProps.field))
    }),
    (dispatch, { connectProps }) => ({
        onChange: event => onChange(dispatch, connectProps, event)
    })
)(TextQuestion);