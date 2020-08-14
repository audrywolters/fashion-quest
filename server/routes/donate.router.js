const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get all clothes per user
router.get('/', (req, res) => {
    // AUDRY - NOT DONE!
    const queryText = ` DELETE FROM closet
                        WHERE clothing_item = 6 
                        AND   closet_item = 1;`

    pool.query( queryText, [ req.user.id ] )
                
            .then( ( result ) => { 
                res.send( result.rows ) 
            })
            .catch( ( error ) => {
                console.log( 'Error GET details', error )
                res.sendStatus( 500 );  
            });
        });


module.exports = router;

    

