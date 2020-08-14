const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get all clothes per user
router.get('/', (req, res) => {

    const queryText = ` SELECT i.id, i.icon, i.fit, i.color, i."featureA", i."featureB", i.type, c.wearing
                        FROM clothing_item as i
                        JOIN closet as c on c.clothing_item = i.id
                        JOIN "user" as u on u.closet = c.closet_id
                        WHERE u.id = $1
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


module.exports = router;
