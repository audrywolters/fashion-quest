const donateReducer = ( state = '', action ) => {
    switch ( action.type ) {
        case 'DONATE':
            return action.payload;
        default:
            return state;
    }
};

export default donateReducer;
