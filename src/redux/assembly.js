import reduceWithHandlers from '../lib/reduceWithHandlers';
import connectProps from '../lib/connectProps';

const getter = propName => (state, sectionKey) => {
    const propValue = state.assembly && 
        state.assembly[sectionKey] && 
        state.assembly[sectionKey][propName];
    
    if (typeof propValue === 'function') {
        return propValue(state);
    }

    return propValue;
}

const SET_FIRST_NAME = '/assembly/SET_FIRST_NAME';
const setFirstName = (sectionKey, value) => {
    return {
        type: SET_FIRST_NAME,
        sectionKey,
        value
    };
};
const getFirstName = getter('firstName');
export const connectFirstName = sectionKey => 
    connectProps(getFirstName, setFirstName, sectionKey)

const SET_LAST_NAME = '/assembly/SET_LAST_NAME';
const setLastName = (sectionKey, value) => ({
    type: SET_LAST_NAME,
    sectionKey,
    value
});
const getLastName = getter('lastName');
export const connectLastName = sectionKey => 
    connectProps(getLastName, setLastName, sectionKey)

const actionHandlers = {
    [SET_FIRST_NAME]: (state, action) => ({
        ...state,
        [action.sectionKey]: {
            ...state[action.sectionKey],
            firstName: action.value
        }
    }),
    [SET_LAST_NAME]: (state, action) => ({
        ...state,
        [action.sectionKey]: {
            ...state[action.sectionKey],
            lastName: action.value
        }
    })
};

export default reduceWithHandlers({}, actionHandlers);
