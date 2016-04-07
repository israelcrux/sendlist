/**
 *
 * Facebook controller
 *
 */
var FB 	= require('fb'),
		msg = require('../messages');

module.exports = {

	/**
	 * 
	 * Middleware
	 * 
	 * POST
	 * Verifies the autenticity and validty of a Facebook Access Token,
	 * If it isn't, send message to user
	 * If it is, pass to the next function
	 *
	 * @param {string} req.body.fb_access_token : the Facebook access token
	 *
	 * @next {object} req.fb_resp : The facebook response
	 *
	 */
	verifyToken : function(req,res,next){
		FB.setAccessToken(req.body.fb_access_token);
		FB.api(
			'/me', 
			{ fields: ['id', 'first_name', 'last_name', 'email'] }, 
			function(fbres) {
				if( fbres.error ){
					res.status(400).send(
						{
							success:false, 
							type:msg.fb_invalid_access_token
						}
					);
				} else {
					req.fb_resp = fbres;
					next();
				}
			});

	}


};