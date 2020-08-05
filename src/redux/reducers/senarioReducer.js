const senarioReducer = (state = [], action) => {
    switch ( action.type ) {
        case 'SET_SENARIO':
            return action.payload;
        default:
            return state;
    }
};

export default senarioReducer;
