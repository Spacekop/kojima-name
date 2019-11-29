import { combineReducers } from 'redux';
import layout from './layout';
import flavor from './flavor';
import diceRolls from './diceRolls';
import assembly from './assembly';
import answers from './answers';

export default combineReducers({
    layout,
    flavor,
    diceRolls,
    assembly,
    answers
});
