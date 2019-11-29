import getAnswerValue from './getAnswerValue';
import sections from '../data/sections.json';
import { isPrimaryNameCategoryReady } from './isReady';

export const nameCategorySections = {
  catNormal: true,
  catOccupational: true,
  catHorny: true,
  catThe: true,
  catCool: true,
  catViolent: true,
  catArbitrary: true
};
Object.keys(nameCategorySections).forEach(name => {
  nameCategorySections[name] = sections.find(s => s.name === name)
});

const otherSectionVisibility = {
  explanation: state => isPrimaryNameCategoryReady(state),
  summary: state => isPrimaryNameCategoryReady(state) && state.answers.explanation
};

export const getActiveNameCategories = state => {
  if (typeof state.diceRolls.isMultiName === 'undefined') {
    return [];
  }

  return getAnswerValue(state, 'isMultiName')
    ? Object.keys(nameCategorySections)
    : [ getAnswerValue(state, 'nameCategory') ]
}

export default state => {
  const otherSections = sections
    .map(s => s.name)
    .filter(name => {
      return !nameCategorySections.hasOwnProperty(name) &&
        (
          !otherSectionVisibility.hasOwnProperty(name) || 
          otherSectionVisibility[name](state)
        )
    });
  
  return [
    ...otherSections,
    ...getActiveNameCategories(state)
  ];
};
