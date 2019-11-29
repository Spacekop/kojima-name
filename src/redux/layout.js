import reduceWithHandlers from '../lib/reduceWithHandlers';

const SET_ACTIVE_SECTION = '/layout/SET_ACTIVE_SECTION';
export const setActiveSection = activeSection => ({
    type: SET_ACTIVE_SECTION,
    activeSection
});

const initial = {
    activeSection: 'howManyNames'
};

const actionHandlers = {
    [SET_ACTIVE_SECTION]: (state, action) => ({
        ...state,
        activeSection: action.activeSection
    })
};

export default reduceWithHandlers(initial, actionHandlers);
