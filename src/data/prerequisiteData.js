import { questionsInSection } from './questions';
import objectMap from '../lib/objectMap';
import sections from './sections.json';

export default objectMap(sections, section => {
  const requiredQuestions = [];
  const diceRolls = [];

  const questions = questionsInSection(section.name);
  questions.forEach(q => {
      if (q.sourceField) {
        requiredQuestions.push(q.sourceField);
      }

      if (q.type === 'dice') {
          diceRolls.push(q.name);
          q.choices.forEach(c => {
              if (c.sourceField) {
                requiredQuestions.push(c.sourceField);
              }
          })
      }
  });
  
  return {
      key: section.name,
      value: { questions: requiredQuestions, diceRolls }
  };
});
