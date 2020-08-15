const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// get the current user's current outfit
router.get('/', rejectUnauthenticated, (req, res) => {

    const queryText = ` SELECT i.id, i.icon, i.fit, i.color, i."featureA", i."featureB", i.type
                        FROM clothing_item as i
                        JOIN closet as c on c.clothing_item = i.id
                        JOIN "user" as u on u.closet = c.closet_id
                        WHERE u.id = $1
                        AND   c.wearing = true
                        ORDER BY i.id; `

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
