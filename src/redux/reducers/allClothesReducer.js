const allClothesReducer = ( state = [], action ) => {
    switch ( action.type ) {
        case 'SET_ALL_CLOTHES':
            return action.payload
        default:
            return state;
    }
};

export default allClothesReducer;
