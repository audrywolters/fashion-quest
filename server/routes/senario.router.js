const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get the all the story senarios
router.get('/', (req, res) => {
    pool.query( `SELECT "senario"
                 FROM "story"
                 ORDER BY "id" ASC;` )
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
