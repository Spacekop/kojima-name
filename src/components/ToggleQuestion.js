import React from 'react';
import { connect } from 'react-redux';
import './TextQuestion.css';
import './ToggleQuestion.css';

const TextQuestion = ({number, text, toggleText, answer, onToggle}) => {
  const isActive = !!answer;
  const buttonClasses = 'toggler ' + (isActive ? 'on' : 'off');
  return <div className='text-question'>
    <div className='question-number'>{number}.</div>
    <div className='question-body'>
        <label>{text}</label>
        <button className={buttonClasses} onClick={onToggle(!isActive)}>
          <span className='checkbox'></span>{toggleText}
        </button>
    </div>
    <div className="clear-fix"></div>
  </div>;
}

export default connect(
    (state, { connectProps }) => ({
        answer: connectProps.getter(state, connectProps.field)
    }),
    (dispatch, { connectProps, activeValue }) => ({
        onToggle: (isActive) => () => 
          dispatch(connectProps.actionCreator(connectProps.field, isActive ? activeValue : ''))
    })
)(TextQuestion);