import howManyNames from './howManyNames.json';
import personalInfoQuestions from './personalInfoQuestions.json';
import kojimaInfoQuestions from './kojimaInfoQuestions.json';
import nameConditionQuestions from './nameConditionQuestions.json';
import nameCategoryQuestions from './nameCategoryQuestions.json';
import explanationQuestions from './explanationQuestions.json';

howManyNames.forEach(q => q.section = 'howManyNames');
personalInfoQuestions.forEach(q => q.section = 'personalInformation');
kojimaInfoQuestions.forEach(q => q.section = 'kojimaInformation');
nameConditionQuestions.forEach(q => q.section = 'nameConditions');
explanationQuestions.forEach(q => q.section = 'explanation');

export const allQuestions = [
  ...howManyNames,
  ...personalInfoQuestions,
  ...kojimaInfoQuestions,
  ...nameConditionQuestions,
  ...nameCategoryQuestions,
  ...explanationQuestions
];

export const questionSections = allQuestions.reduce((acc, q) => ({
  ...acc,
  [q.name]: q.section
}), {});

export const questionsBySection = allQuestions.reduce((acc, question) => {
  const { section } = question;
  if (!acc[section]) {
    acc[section] = [];
  }

  question.number = acc[section].push(question);
  return acc;
}, {});

export const questionsInSection = section => questionsBySection[section] || [];
