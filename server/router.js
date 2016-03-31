/**
 *
 * The server router
 * 
 */
var r = require('express').Router(),
    config = require('./config');


/*----------  Controllers  ----------*/

var lists = require('./controllers/lists_controller');

/*----------  Routes  ----------*/

r.get('/',function(req,res){ res.send('I\'ts up'); });

/**
 * POST
 * Create a list
 */
r.post('/lists', lists.create);

/**
 * GET
 * Read your lists
 */
r.get('/lists', lists.feed);

/**
 * PUT
 * Update a list
 */
r.put('/lists/:id', lists.update);

/**
 * DELETE
 * Delete a list
 */
r.delete('/lists/:id', lists.delete);




module.exports = r;