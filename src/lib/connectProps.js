export const onChange = (dispatch, connectProps, source) => {
    const value = source.target
        ? source.target.value
        : source;

    dispatch(connectProps.actionCreator(connectProps.field, value));
};

export default (getter, actionCreator, field) => ({
    getter,
    actionCreator,
    field
});
