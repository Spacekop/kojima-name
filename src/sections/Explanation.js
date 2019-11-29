import React from 'react';
import { connect } from 'react-redux';
import { setAnswer } from '../redux/answers';
import { formatPrimaryName } from '../lib/nameBuilder';
import Section from '../components/Section';

const Explanation = ({ 
    number, 
    name, 
    title, 
    instructions,
    formattedName,
    answer,
    onChange }) =>
<Section
    number={number}
    name={name}
    title={title}
    instructions={instructions}
>
    <p>Hi, I'm {formattedName}, and if you're wondering how I got this name, well, let me tell you...</p>
    <textarea style={{width: '100%', height: '40rem', fontSize: '1rem'}} onChange={onChange}>
        {answer}
    </textarea>
</Section>;

export default connect(state => ({
    answer: state.answers.explanation,
    formattedName: formatPrimaryName(state)
}), dispatch => ({
    onChange: (event) => dispatch(setAnswer('explanation', event.target.value))
}))(Explanation);