import reduceWithHandlers from '../lib/reduceWithHandlers';

const SET_FLAVOR = '/flavor/SET_FLAVOR';
export const setFlavor = (field, value) => ({
    type: SET_FLAVOR,
    field, value
});

const actionHandlers = {
    [SET_FLAVOR]: (state, action) => ({
        ...state,
        [action.field]: action.value
    })
};

export default reduceWithHandlers({}, actionHandlers)