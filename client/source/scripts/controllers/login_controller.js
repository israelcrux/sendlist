/**
 *
 * Login Controller
 * Sign in/Log in controller
 */

angular.module('sendlist.LoginController',[])

.controller('LoginController',[ 
	'$scope',
	'Facebook',
	'AuthService',
	'MESSAGES',
	'EVENTS',
	function(
	$scope,
	Facebook,
	AuthService,
	MESSAGES,
	EVENTS){

	$scope.data = {};

	/**
	 * Log-in/Sign-up with facebook
	 */	
	$scope.facebookLogin = function(){
		Facebook.login(function(fbresp) {
			
			if(fbresp.status !== 'connected'){
				return null;
			}

			AuthService.facebookSignup(fbresp.authResponse.accessToken)
				.then(function(resp){
					if(resp.success){
						//Let app know
						$scope.$emit(EVENTS.LOGIN_SUCCESS,resp.credentials);
					} else {
						alert(MESSAGES.SERVER_ERROR);
					}
				});
			
		});
	};


	/**
	 * Log-in/Sign-up with email
	 */	
	$scope.emailLogin = function(){
		// missing implementation :P
	};


}]);