const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get all clothes per user
router.post('/', (req, res) => {

    console.log('in delete');

    const removeID   = req.body.removeID;

    const queryText = ` DELETE FROM closet
                        WHERE clothing_item = $1 
                        AND   closet_id = $2;`

    pool.query( queryText, [ removeID, req.user.id ] )
                
            .then( ( result ) => { 
                console.log( 'delete clothing: ', result )
            })
            .catch( ( error ) => {
                console.log( 'Error GET details', error )
                res.sendStatus( 500 );  
            });
        });


module.exports = router;

    

