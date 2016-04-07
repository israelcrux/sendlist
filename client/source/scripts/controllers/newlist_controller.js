/**
 *
 * NewListController Controller
 * Sign in/Log in controller
 */

angular.module('sendlist.NewListController',[])

.controller('NewListController',[ 
	'$scope',
	'$rootScope',
	'$state',
	'$stateParams',
	'ListsService',
	'EVENTS',
	'MESSAGES',
	function($scope,$rootScope,$state,$stateParams,ListsService,EVENTS,MESSAGES){

	/**
	 * Credentials
	 */	
	$scope.credentials = $rootScope.credentials;

	/**
	 * List comes from params
	 */		
	$scope.list = $stateParams.list;

	/**
	 * List doesnt come
	 */
	if(!$scope.list){
		ListsService.find($scope.credentials,$stateParams.id)
			.then(function(resp){
				if(resp.success){
					$scope.list = resp.list;
				} else {
					//404
					$state.go('not-found');
				}
			});
	}		


	/**
	 * Add an item to list
	 */	
	$scope.addItem = function(){
		
		var item = {text:$scope.text,done:false};

		//Add to collection
		$scope.list.items.push(item);
		
		//clean input
		$scope.text = "";

		//mark as not saved
		item.saved = false;

		//Save it
		ListsService.addItem(item,$scope.list,$scope.credentials)
			.then(function(resp){
				if(resp.success){
					//mark as saved
					$scope.list.items = resp.items;
				} else {
					//remove
					$scope.list.items.splice( $scope.list.items.indexOf(item), 1);
					alert(MESSAGES.SERVER_ERROR);
				}
			});
	};


	/**
	 *
	 * Set done
	 *
	 */
	$scope.check = function(item){
		
		if(item.checklock){
			return false;
		}
		
		item.checklock = true;
		var setvalue = item.done;
		//Save it
		ListsService.mark(item,$scope.list,$scope.credentials)
			.then(function(resp){
				if(!resp.success){
					//Could not make the change!
					item.done = !setvalue;	
				}
				item.checklock = false;
			});		
	};

}]);