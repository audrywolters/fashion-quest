import loginModeReducer from './loginModeReducer';

describe( 'testing the loginModeReducer...', () => {

    test( 'test initial state is login', () => {
        // test init - wtv input
        const action = { type: 'test' };
        const previousState = undefined;
        let newState = loginModeReducer( previousState, action );
        expect( newState ).toEqual( 'login' ); 
    })

    

    test( 'test set to register mode', () => {
        // test set to register mode
        const action = { type: 'SET_TO_REGISTER_MODE' };
        const previousState = 'login';
        let newState = loginModeReducer( previousState, action );
        expect( newState ).toEqual( 'register' ); 
    })

} )