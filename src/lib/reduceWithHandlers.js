export default (initialState, actionHanders) => (state, action) => {
    const realState = state || initialState;
    const handler = actionHanders[action.type];
    if (typeof handler !== 'function') {
        return realState;
    }

    return handler(realState, action);
};