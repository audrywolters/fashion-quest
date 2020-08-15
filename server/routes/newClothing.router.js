const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();




// you found new item!
router.get('/', (req, res) => {

    const queryText =  `SELECT id
                        FROM clothing_item AS i
                        WHERE i.id NOT IN ( SELECT clothing_item
                                            FROM closet
                                            WHERE closet_id = $1)
                        LIMIT 1;`

    pool.query( queryText, [ req.user.id ] )
                
            .then( ( result ) => { 
                res.send( result.rows[0] ) 
            })
            .catch( ( error ) => {
                console.log( 'Error GET details', error )
                res.sendStatus( 500 );  
            });
        });

router.post('/', (req, res) => {
    // INSERT INTO closet (closet_id, clothing_item, wearing)
    // SELECT <userID>, <clothing_id>, false;
});


module.exports = router;

    

