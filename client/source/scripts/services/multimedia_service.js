/**
 *
 * Multimedia service
 *
 */
angular.module('sendlist.MultimediaService',[])
.factory('MultimediaService',['$http',function($http){
	return {
		
		/**
		 *
		 * Facebook signup and login
		 * @param {fb_access_token} string : The facebook Access token
		 *
		 */
		userpic : function(user){
			if(user.facebook_id){
				return '//graph.facebook.com/'+user.facebook_id+'/picture';
			} else {
				return '//img/default-user.jpg';
			}
		}

	};
}]);