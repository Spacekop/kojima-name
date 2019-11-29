import { questionSections } from '../data/questions';
import prerequisiteData from '../data/prerequisiteData';
import getAnswerValue from './getAnswerValue';

export const missingAnswersBySection = state => {
  const result = Object.keys(prerequisiteData).reduce((acc, section) => {
    const prerequisites = prerequisiteData[section];
    const result = {
      ...acc
    };

    const addMissing = q => {
      const sourceSection = questionSections[q];
      
      if (!result[sourceSection]) {
        result[sourceSection] = [];
      }

      result[sourceSection].push(q);
    };

    prerequisites.questions
      .filter(q => !getAnswerValue(state, q))
      .forEach(addMissing);
    
    prerequisites.diceRolls
      .filter(q => !state.diceRolls[q])
      .forEach(addMissing);
  
    return result;
  }, {});

  return result;
};

const isReady = (state, section) => {
  return prerequisiteData[section].diceRolls.every(name => state.diceRolls[name]) &&
    prerequisiteData[section].questions.every(name => getAnswerValue(state, name))
};

export const isNameCategoryReady = (state, nameCategory) =>
  nameCategory &&
  isReady(state, nameCategory) && 
  isReady(state, 'nameConditions');

export const isPrimaryNameCategoryReady = state => 
  isNameCategoryReady(state, getAnswerValue(state, 'nameCategory'));

export default isReady;
