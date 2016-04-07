/**
 *
 * API error messages
 *
 */

var messages = {

	auth_required : {
			name : 'auth_required',
			message : 'BAD AUTH'
		},

	invalid_access_token : {
			name : 'fb_invalid_access_token',
			message : 'Facebook provided access token is invalid or expired'
		},
	
	unknown_error : {
			name : 'unknown_error',
			message : 'Unknown error'
	}

};

module.exports = messages;