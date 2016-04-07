/**
 *
 * The server router
 * 
 */
var r = require('express').Router(),
		path = require('path'),
    config = require('./config');


/*-----------------------------------*/
/*----------  Controllers  ----------*/
/*-----------------------------------*/

var lists = require('./controllers/lists_controller'),
		users = require('./controllers/users_controller'),
		fb    = require('./controllers/facebook_controller'),
		auth  = require('./controllers/auth_controller');

/*-----------------------------------*/
/*-------------  Routes  ------------*/
/*-----------------------------------*/

/*----------  Users ----------*/

/**
 * POST
 * Facebook auth (Login/Signup)
 */
r.post('/signup/facebook', fb.verifyToken, auth.fb_KeyOrPass, users.create);


/*----------  Lists ----------*/

/**
 * POST
 * Create a list
 */
r.post('/lists', auth.required, lists.create);

/**
 * GET
 * Read your lists
 */
r.get('/lists', auth.required, lists.feed);

/**
 * PUT
 * Update a list
 */
r.put('/lists/:id', auth.required, lists.update);

/**
 * DELETE
 * Delete a list
 */
r.delete('/lists/:id', auth.required, lists.delete);

/**
 * GET
 * Find one of your lists
 */
r.get('/lists/:id', auth.required, lists.find);


/**
 * GET
 * Read a single (shared) list
 */
// r.get('/sl/:id', auth.required, lists.findShared);



/*----------  Views ----------*/

/**
 * GET
 * Respond with index, whenever requested for an angular route
 */
var public_path = path.join(__dirname, config.public_dir);
r.get(
	[
		'/login',
		'/not-found',
		'/list/:id'
	],
	function(req,res){ 
		res.sendFile( public_path + '/index.html' );
	});



module.exports = r;