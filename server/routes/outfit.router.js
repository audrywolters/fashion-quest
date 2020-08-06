const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get the current user's current outfit
router.get('/', (req, res) => {

    // AUDRY - i forgot how to send stuff through req.body
    // const {
    //     userID
    // } = req.user.id;

    // AUDRY - this query is inncorrecct
    const queryText = `SELECT   s."clothingType", s.color, s.fit, s.icon, s.neck, s."sleeveLength",
                                p."clothingType", p.color, p.fit, p.icon, p.cut,  p."legLength"
                        FROM 	"user" as u
                        JOIN 	outfit as o on o.id       = u.outfit
                        JOIN 	shirt  as s on o.shirt_id = s.id
                        JOIN 	pant   as p on o.pant_id  = p.id
                        WHERE 	u.id = $1;`

    pool.query( queryText, [ req.user.id ] )
                
            .then( ( result ) => { 
                // AUDRY - this will hopefully return mulit rows
                // why did i do this
                res.send( result.rows[0] ) 
            })
            .catch( ( error ) => {
                console.log( 'Error GET details', error )
                res.sendStatus( 500 );  
            });
        });

router.post('/', (req, res) => {

});

module.exports = router;
