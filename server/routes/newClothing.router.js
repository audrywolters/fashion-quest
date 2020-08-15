const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// you found new item!
router.get('/', rejectUnauthenticated, (req, res) => {

    const queryText =  `SELECT *
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

    const userID = req.user.id;
    const clothing_id = req.body.newClothingID;

    const queryText =  `INSERT INTO closet (closet_id, clothing_item, wearing)
                        VALUES ($1, $2, $3);`

    pool.query( queryText, [ userID, clothing_id, 'false' ] )
                
            .then( ( result ) => { 
                res.sendStatus( 200 )
            })
            .catch( ( error ) => {
                console.log( 'Error GET details', error )
                res.sendStatus( 500 );  
            });
        });

module.exports = router;

    

