const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// what's in the user's closet
router.put('/', (req, res) => {

        const queryText =  `UPDATE closet
                            SET wearing = true
                            WHERE id = $3
                            AND closet_id = $1;
                            
                            UPDATE closet
                            SET wearing = false
                            WHERE id = $2
                            AND closet_id = $1;
                            
                            UPDATE outfit
                            SET clothing_item = $3
                            WHERE clothing_item = $2
                            AND outfit_id = $1;`

    pool.query( queryText, [ req.user.id, req.params.changeOutOf, req.params.changeInto ] )
                
            .then( ( result ) => { 
                res.send( result.rows ) 
            })
            .catch( ( error ) => {
                console.log( 'Error GET details', error )
                res.sendStatus( 500 );  
            });
        });

module.exports = router;
