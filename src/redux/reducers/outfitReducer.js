const outfitReducer = ( state = [], action ) => {
    switch ( action.type ) {
        case 'SET_OUTFIT':
            return action.payload;
        default:
            return state;
    }
};

export default outfitReducer;
