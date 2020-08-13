const inputReducer = ( state = '', action ) => {
    switch ( action.type ) {
        case 'SET_INPUT':
            return action.payload;
        case 'UNSET_INPUT':
            return '';
        default:
            return state;
    }
};

export default inputReducer;
