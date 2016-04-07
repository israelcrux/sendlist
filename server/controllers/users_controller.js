/**
 *
 * Users controller
 *
 */
var User = require('../models/users'),
		Key = require('../models/keys');

module.exports = {

	/**
	 * 
	 * POST
	 * Create a User
	 * 
	 */
	create : function(req,res){
		
		var data = req.body.user_data;
		
		if(req.fb_resp){
			data = {
				facebook_id : req.fb_resp.id,
				first_name  : req.fb_resp.first_name,
				last_name   : req.fb_resp.last_name
			};
		}

		var user = new User(data);

		user.save(function(err,created_user){

			if(err){
				return res.status(500).send({success:false});
			}
								
			//create their API KEY
			var key = new Key({	user : created_user._id	});
			key.save(function(err,created_key){
				if(err){
					res.status(500).send({success:false});
				} else {
					res.send({success:true,key:created_key.key,user:created_user});
				}
			});

		});
	}


};