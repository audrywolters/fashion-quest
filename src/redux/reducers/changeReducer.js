const changeReducer = ( state = '', action ) => {
    switch ( action.type ) {
        case 'SET_TO_CHANGE_MODE':
            return 'change mode';
        case 'UNSET_CHANGE_MODE':
            return '';
        case 'UPDATE_OUTFIT':
            return action.payload;
        default:
            return state;
    }
};

export default changeReducer;
