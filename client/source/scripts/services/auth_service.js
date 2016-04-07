/**
 *
 * Auth service
 *
 */

angular.module('sendlist.AuthService',[])
.factory('AuthService',['$http',function($http){
	return {
		
		/**
		 *
		 * Facebook signup and login
		 * @param {string} fb_access_token : The facebook Access token
		 *
		 */
		facebookSignup : function(fb_access_token){
			return $http.post('/signup/facebook',{fb_access_token:fb_access_token})
				.then(function(resp){
					//success
					return {
						success:true,
						credentials:{
							key:resp.data.key,
							user:resp.data.user
						}
					};
				},function(){
					//error
					return {success:false};
				});
		}

	};
}]);