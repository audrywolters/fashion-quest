const changeReducer = ( state = {}, action ) => {
    switch ( action.type ) {
        case 'UPDATE_OUTFIT':
            return action.payload;
        default:
            return state;
    }
};

export default changeReducer;
