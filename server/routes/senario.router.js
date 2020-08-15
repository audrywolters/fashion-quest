const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// get the all the story senarios
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query( `SELECT senario
                 FROM story
                 ORDER BY id;` )
            .then( ( result ) => { 
                res.send( result.rows ) 
            })
            .catch( ( error ) => {
                console.log( 'Error GET details', error )
                res.sendStatus( 500 );  
            });
        });

module.exports = router;
