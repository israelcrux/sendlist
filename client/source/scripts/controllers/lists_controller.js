/**
 *
 * ListsController Controller
 * Sign in/Log in controller
 */

angular.module('sendlist.ListsController',['external'])

.controller('ListsController',[ 
	'$scope',
	'$rootScope',
	'$state',
	'ListsService',
	'EVENTS',
	'MESSAGES',
	'_update',
	function($scope,$rootScope,$state,ListsService,EVENTS,MESSAGES,_update){


	/**
	 * Loader
	 */	
	$scope.loaded = false;

	/**
	 * Credentials
	 */	
	$scope.credentials = $rootScope.credentials;

	/**
	 The lists
	 */
	$scope.lists = [];

	/**
	 * New list locker
	 */
	$scope.new_list_input_lock = false;

	/**
	 *
	 * Add a list
	 *
	 */
	$scope.addList = function(name){
		if(!$scope.new_list_input_lock){
			
			// Lock input
			$scope.new_list_input_lock = true;

			var list = {title:name,items:[]};
			// $scope.lists.push(list);

			ListsService.add(list,$scope.credentials)
				.then(function(resp){
					if(resp.success){

						//Update object
						// _update(resp.list,list);
						// $state.go('list',{list:list,id:list._id});
						$state.go('list',{list:resp.list,id:resp.list._id});
					} else {
						alert(MESSAGES.SERVER_ERROR);
					}
					
					//Unlock input
					$scope.new_list_input_lock = false;
				});
		}
	};


	/**
	 * Loading lists locker
	 */
	$scope.feeding = false;

	/**
	 * Get lists
	 */
	$scope.feed = function(){
	
		//lock infinite scroll
		$scope.feeding = true;

		//get last list
		var last = $scope.lists[ $scope.lists.length -1 ];
		
		//get last list's creation timestamp
		var before = (last && last.created)? last.created : '';

		//Fetch lists before last
		ListsService.feed($scope.credentials,before)
			.then(function(resp){

				//remove loader
				$scope.loaded = true;

				if(resp.success){

					//Set done items
					for (var i = 0; i < resp.lists.length; i++) {
						resp.lists[i].done_items = 0;
						for (var j = 0; j < resp.lists[i].items.length; j++) {
							resp.lists[i].items[j].done && resp.lists[i].done_items++;
						}
						$scope.lists.push( resp.lists[i] );
					}

				} else {
					alert(MESSAGES.SERVER_ERROR);
				}

				//unlock infinite scroll
				$scope.feeding = false;
				
			});
	};

}]);