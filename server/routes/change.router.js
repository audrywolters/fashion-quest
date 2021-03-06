const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// what's in the user's closet
router.put('/', rejectUnauthenticated, async (req, res) => {

    // Get a single connection from the pool to do the transaction
    // THIS IS IMPORTANT - won't work if you don't use the same connection!
    const connection = await pool.connect();

    try {
        // Start transaction
        await connection.query( 'BEGIN;' );

        const toTakeOff = req.body.changeOutOf;
        const toPutOn   = req.body.changeInto;
        
        // put clothing back in closet
        const takeOffClothing = `UPDATE closet
                                 SET wearing = false
                                 WHERE clothing_item = $1;`
        await connection.query( takeOffClothing, [toTakeOff] );

        // take out new piece
        const putOnClothing =  `UPDATE closet
                                SET wearing = true
                                WHERE clothing_item = $1;`
        await connection.query( putOnClothing, [toPutOn] );

        // wear it!
        const changeOutfit =   `UPDATE outfit
                                SET clothing_item = $1
                                WHERE clothing_item = $2;`
        await connection.query ( changeOutfit, [toPutOn, toTakeOff] );

        // cross fingers
        await connection.query( 'COMMIT;' );
        res.sendStatus( 200 );

    } catch ( error ) {
        console.log( 'Error on Update Clothing: ', error );
        // bummer, have to cancel everything
        await connection.query( 'ROLLBACK' );
        res.sendStatus( 200 );

    } finally {
        // goodbye DB
        connection.release();
    }
})

module.exports = router;
