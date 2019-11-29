import React from 'react';
import { connect } from 'react-redux';
import Section from '../components/Section';
import TextQuestion from '../components/TextQuestion';
import { formatPrimaryName, formatAllNames } from '../lib/nameBuilder';
import getAnswerValue from '../lib/getAnswerValue';
import { nameCategorySections } from '../lib/getActiveSections';
import './Summary.css';

class SummarySection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAllNames: false
        };
    }

    render() {
        const { 
            number, 
            name, 
            title, 
            instructions, 
            names, 
            primaryName,
            explanation 
        } = this.props;

        const toggle = () => this.setState({
            showAllNames: !this.state.showAllNames
        });

        return <Section
            number={number}
            name={name}
            title={title}
            instructions={instructions}
        >
            <h2>Names</h2>
            <TextQuestion 
                readOnly={true}
                text={'Your name is'}
                answer={primaryName}
            />

            <button onClick={toggle} className='toggle-all-names'>
                {this.state.showAllNames ? '[-]' : '[+]'} Show All Names
            </button>
            {this.state.showAllNames &&
            <table>
                <tbody>
                {Object.keys(names).map(c => {
                    return <tr key={c}><td>{nameCategorySections[c].title}</td><td>{names[c]}</td></tr>
                })}
                </tbody>
            </table>
            }
        
            <h2>Explanation</h2>
            <p className='explanation'>
                {explanation}
            </p>
        </Section>;    
    }
} 

export default connect(state => ({
    primaryCategory: getAnswerValue(state, 'nameCategory'),
    names: formatAllNames(state),
    primaryName: formatPrimaryName(state),
    explanation: state.answers.explanation
}))(SummarySection);