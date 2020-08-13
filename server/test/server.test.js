const app = require( '../server' );
const testServer = require( 'supertest' );

let consoleLogz;

describe( 'test user routes', () => {

    test( 'logout route should always respond with status 200', async () => {
        const response = await testServer( app ).post( '/api/user/logout' );
        expect( response.statusCode ).toBe( 200 );
    })

    test( 'user route should be protected - must be loggin in', async () => {
        const response = await testServer( app ).get( '/api/user' );
        expect( response.statusCode ).toBe( 403 );
    })

    test( 'user route should return user if logged in', async () => {
        const agent = testServer.agent( app );
        const response = await agent.post( '/api/user/login' )
            .send({ username: 'chan', password: '123' });
            expect( response.statusCode ).toBe( 200 );



        const userResponse = await agent.get( '/api/user/' );
        expect( userResponse.statusCode ).toBe( 200 );
        //expect( userResponse.username ).toBe( 'chan' );
    })


    console.log( 'userResponse', consoleLogz );


})