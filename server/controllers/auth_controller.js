/**
 *
 * Auth controller
 *
 */
var User 	= require('../models/users'),
		Key = require('../models/keys'),
		msg = require('../messages'),
		hasher = require('sha.js');

module.exports = {


	/**
	 * 
	 * Middleware
	 * 
	 * POST
	 * Verifies the authenticity of any request,
	 * If authentic executes next()
	 * If not, responds 401
	 *
	 * auth transport channel:  HEADERS
	 * data transport channel: BODY
	 * token name: token
	 *
	 * Request must be signed as
	 *
	 * 	user_id : the user id
	 * 	token : the request token
	 *
	 * @param {string} req.headers.token : The request token
	 *
	 */	
	required : function(req,res,next){

		Key.findOne({user:{$in:[req.headers.user_id]}})
			.populate('user')
			.exec(function(err,key){

				if(err){
					return res.status(500).send({success:false,type:msg.unknown_error});
				} 
				
				if(!key){
					return res.status(401).send({success:false,type:msg.auth_required});
				}

				var serialized_data = JSON.stringify( req.body ),
						client_token   = req.headers.token;

				/**
				 *
				 * serialized_data + req.url + key.key 
				 * Guarantees a unique signature for each request
				 */
				sha256 = hasher('sha256');
				var server_token = sha256.update( 
						serialized_data + req.url + key.key 
					).digest('hex');

				if( client_token === server_token ){
					//Authentic
					req.user = key.user;
					next();
				}
				else{
					//fake
					res.status(401).send({success:false,type:msg.auth_required});
				}

			});	
		
	},


	/**
	 * 
	 * Middleware
	 * 
	 * POST
	 * From req.fb_resp, finds user by facebookID, if user is present,
	 * returns their API Key, if user is not found, executes next()
	 *
	 * @param {Object} req.fb_resp : Verified Facebook response  
	 *
	 */
	fb_KeyOrPass : function(req,res,next){

		if(typeof req.fb_resp !== 'object'){
			throw new Error('req.fb_resp is missing, (FB middleware required)');
		}

		//Find existing user 
		User.findOne({facebook_id:req.fb_resp.id},'+facebook_id',function(err,user){

			if(err){
				return res.status(500).send({
					success:false,
					type:msg.unknown_error
				});
			}

			if(user){
				// If user already exists, read or generate API key
				Key.findOrCreate({user:user._id},function(err,key){
					if(err){
						res.status(500).send({success:false,type:msg.unknown_error});
					} else {
						res.send({success:true,user:user,key:key.key});
					}
				});
			} else {
				//If user is not found, pass
				next();
			}

		});

	}


};