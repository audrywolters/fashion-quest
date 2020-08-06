const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// what's in the user's closet
router.get('/', (req, res) => {

    const queryText = `SELECT i.type, i.icon, i.fit, i.color, i."featureA", i."featureB"
                        FROM clothing_item as i
                        JOIN closet as c on c.clothing_item = i.id
                        JOIN "user" as u on u.closet = c.closet_id
                        WHERE u.id = $1;`

    pool.query( queryText, [ req.user.id ] )
                
            .then( ( result ) => { 
                res.send( result.rows ) 
            })
            .catch( ( error ) => {
                console.log( 'Error GET details', error )
                res.sendStatus( 500 );  
            });
        });

router.post('/', (req, res) => {

});

module.exports = router;