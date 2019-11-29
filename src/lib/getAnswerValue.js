import { allQuestions } from '../data/questions';
import getSelectedDiceRollChoice from './getSelectedDiceRollChoice';

export default (state, name) => {
  const question = allQuestions.filter(q => q.name === name)[0];
  if (!question) {
    console.warn(`No question found with name ${name}`);
    return '';
  }

  let valueHaver;
  if (question.type === 'dice') {
    const diceRoll = state.diceRolls[name];
    if (!diceRoll) {
      return '';
    }

    valueHaver = getSelectedDiceRollChoice(question.choices, diceRoll);
  } else if (question.type === 'textWithFlavor') {
    valueHaver =  state.flavor[question.name]
      ? question
      : { value: '' };
  } else {
    valueHaver = question;
  }

  if (valueHaver.hasOwnProperty('value')) {
    return valueHaver.value;
  }

  const sourceQuestionName = valueHaver.hasOwnProperty('sourceField')
    ? valueHaver.sourceField
    : valueHaver.name;

  return state.answers[sourceQuestionName] || '';
};
