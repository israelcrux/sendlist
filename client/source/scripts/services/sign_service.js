/**
 *
 * Sign service
 * Signs headers for request auth
 *
 */

angular.module('sendlist.SignService',['external'])
.factory('SignService',['jsSHA',function(jsSHA){
	
	
	return {
		
		/**
		 *
		 * Sign headers
		 * @param {string} uri : The resource
		 * @param {string} key : The API key
		 * @param {string} user_id : The user id
		 * @param {object} data : The request body
		 *
		 */
		getSignedHeaders : function(uri,key,user_id,data){
			data = data || {};

			var source = angular.toJson(data) + uri + key,
					shaObj = new jsSHA("SHA-256", "TEXT");

			shaObj.update(source);
			var headers = {
				user_id : user_id,
				token : shaObj.getHash("HEX")
			};

			return headers;
		}

	};
}]);