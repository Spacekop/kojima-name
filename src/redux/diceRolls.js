import reduceWithHandlers from '../lib/reduceWithHandlers';

const SET_DICE_ROLL = '/diceRolls/SET_DICE_ROLL';
export const setDiceRoll = (field, value) => ({
    type: SET_DICE_ROLL,
    field, value
});

const actionHandlers = {
    [SET_DICE_ROLL]: (state, action) => ({
        ...state,
        [action.field]: action.value
    })
};

export default reduceWithHandlers({}, actionHandlers)