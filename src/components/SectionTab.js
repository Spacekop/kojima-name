import React from 'react';
import './SectionTab.css';

export default ({ number, title, isActive, isSelected, missingCount, onClick }) => {
    const className = 'section-tab' + (!isActive ? ' inactive' : '') + (isSelected ? ' selected' : '');
    const clickHandler = isActive ? onClick : () => {};

    return <div className={className} onClick={clickHandler}>
        { isActive && missingCount > 0 && <span className='missing-count'>{missingCount}</span> }
        <h1>{number}</h1>
        <p>{title}</p>
        <div style={{ clear: 'both' }}></div>
    </div>
};
