const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get the current user's outfit
router.get('/', (req, res) => {
    pool.query( `SELECT m.id, array_agg(g.name)
                 FROM "movies" AS m
                 JOIN "movie_genres" AS mg on m.id = mg.movie_id
                 JOIN "genres" AS g on g.id = mg.genre_id
                 GROUP BY m.id
                 ORDER BY m.id ASC;` )
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
