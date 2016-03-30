/**
 *
 * The server router
 * 
 */
var router = require('express').Router(),
    config = require('./config');


/*----------  Models  ----------*/



/*----------  Routes  ----------*/


router.get('/',function(req,res){ res.send('I\'ts up'); });

module.exports = router;