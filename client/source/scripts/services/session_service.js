/**
 *
 * Session service
 * Basically read and write to localStorage (default)
 * or whatever storage (Not implemented)
 */

angular.module('sendlist.SessionService',[])
.factory('SessionService',[function(){

	/**
	 * Storage
	 */
	 // var storage = window.localStorage;
	 var storage = window.sessionStorage;

	return {

		/**
		 *
		 * read from storage
		 *
		 */
		read : function(){
			var credentials = {};

			try{
				credentials = JSON.parse( storage.credentials );
			} catch(e){
				delete storage.credentials;
				return {};
			}

			if(	typeof credentials.key === 'string' &&
					credentials.user && credentials.user._id && 
					typeof credentials.user._id === 'string' 
			){
				return credentials;
			} else {
				delete storage.credentials;
				return {};
			}
		},
		
		/**
		 *
		 * Store in chosen storage
		 * @param {object} credentials : The user credentials
		 *		lile {user,key} where user is a user object and key a string
		 *
		 */
		store : function(credentials){
			if(	typeof credentials.key === 'string' &&
					credentials.user && credentials.user._id && 
					typeof credentials.user._id === 'string' 
			){
				storage.credentials = angular.toJson( credentials );
			}
		},


		/**
		 *
		 * Delete from storage
		 *
		 */
		delete : function(){
			delete storage.credentials;
		}
	};

}]);