import reduceWithHandlers from '../lib/reduceWithHandlers';
import connectProps from '../lib/connectProps';

const SET_ANSWER = '/questions/SET_ANSWER';
export const setAnswer = (name, answer) => ({
  type: SET_ANSWER,
  name, answer
});
export const getAnswer = (state, name) => state.answers[name] || '';
export const connectAnswers = name => connectProps(getAnswer, setAnswer, name);

const actionHandlers = {
  [SET_ANSWER]: (state, action) => ({
    ...state,
    [action.name]: action.answer
  })
};

export default reduceWithHandlers({}, actionHandlers);
