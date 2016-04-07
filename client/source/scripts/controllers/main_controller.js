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
	$scope.user = $rootScope.credentials.user;

}]);