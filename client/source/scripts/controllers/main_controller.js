/**
 *
 * Main Controller
 *
 */

angular.module('sendlist.MainController',[])

.controller('MainController',['$scope','$state','$rootScope','EVENTS','MultimediaService', 
	function($scope,$state,$rootScope,EVENTS,MultimediaService){

	/**
	 * Expose multimedia service (user picture)
	 */
	$scope.multimedia = MultimediaService;


	/**
	 * Expose state for back button
	 */
	$scope.state = $state;

	/**
	 * User
	 */
	$scope.credentials = $rootScope.credentials;
  $rootScope.$on(EVENTS.SESSION_READY,function(e,credentials){
		$scope.credentials = credentials;
  });

	/**
	 * Log out
	 */
	$scope.logOut = function(){
		$scope.$emit(EVENTS.LOGOUT);
	};

}]);