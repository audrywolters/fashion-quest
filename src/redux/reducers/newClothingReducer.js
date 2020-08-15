const newReducer = ( state = [], action ) => {
    switch ( action.type ) {
        case 'ADD_NEW_CLOTHING':
            return action.payload;
        default:
            return state;
    }
};

export default newReducer;
