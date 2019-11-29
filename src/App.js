import React from 'react';
import { connect } from 'react-redux';
import Section from './components/Section';
import SectionTab from './components/SectionTab';
import Summary from './sections/Summary';
import KojimaBomb from './components/KojimaBomb';
import Explanation from './sections/Explanation';
import { setActiveSection } from './redux/layout';
import sections from './data/sections.json';
import getActiveSections from './lib/getActiveSections';
import getAnswerValue from './lib/getAnswerValue';
import { missingAnswersBySection } from './lib/isReady';

import './App.css';

const specialSections = {
    summary: Summary,
    explanation: Explanation
};

const clearState = () => {
    window.sessionStorage && window.sessionStorage.clear();
    window.scrollTo(0, 0);
    window.location.reload();
};

const App = ({ 
    activeSection,
    selectSection,
    missingAnswersBySection,
    activeSections,
    kojimaBomb
}) => {
    if (kojimaBomb) {
        return <KojimaBomb />;
    }

    const {
        name,
        title,
        number,
        instructions
    } = sections.filter(s => s.name === activeSection)[0];

    const SectionControlToRender = specialSections.hasOwnProperty(activeSection)
        ? specialSections[activeSection]
        : Section;

    return <div>
        <h1 className='page-title'>KOJIMA NAME GENERATOR</h1>
        <div className='section-sidebar'>
            {sections.map(section => {
                const {
                    name: nameForTab,
                    number: numberForTab,
                    title: titleForTab
                } = section;
                const missingCount = (missingAnswersBySection[nameForTab] || []).length;
                const active = !!activeSections.find(s => s === nameForTab);

                return <SectionTab
                    key={nameForTab}
                    number={numberForTab}
                    title={titleForTab}
                    isSelected={nameForTab === activeSection}
                    onClick={() => selectSection(nameForTab)}
                    missingCount={missingCount}
                    isActive={active}
                />;
            })}
        </div>
        <div className='section-container'>
            <SectionControlToRender 
                name={name}
                number={number}
                title={title}
                instructions={instructions}
            />
        </div>
        <div className='footer'>
            <p>
                Thank you for playing<br />
                All contents © Brian "David" Gilbert and <a href="https://www.polygon.com/videos/2019/11/11/20959269/unraveled-kojima-name-generator-death-stranding" target="_blank" rel="noopener noreferrer">Polygon</a><br />
                <a href="https://www.scribd.com/document/434442769/Kojima-Name-Generator" target="_blank" rel="noopener noreferrer">Original worksheet on Scribd.com</a><br />
                <button onClick={clearState}>Reset Form</button>
            </p>
        </div>
    </div>;
};

export default connect(
    state => ({
        kojimaBomb: !!getAnswerValue(state, 'kojimaCondition'),
        activeSection: state.layout.activeSection,
        missingAnswersBySection: missingAnswersBySection(state),
        activeSections: getActiveSections(state)
    }),
    dispatch => ({
        selectSection: sectionKey => dispatch(setActiveSection(sectionKey))
    })
)(App);
