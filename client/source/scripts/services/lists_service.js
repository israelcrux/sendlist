/**
 *
 * Lists service
 *
 */

angular.module('sendlist.ListsService',['sendlist.SignService'])
.factory('ListsService',['$http','SignService',function($http,SignService){
	return {

		/**
		 * 
		 * GET
		 * Find a list
		 * @param {object} cr : The user credentials
		 * @param {string} list_id : The list id
		 *
		 */
		find : function(cr,list_id){
			
			var uri = '/lists/'+list_id,
					headers = SignService.getSignedHeaders(uri,cr.key,cr.user._id);
			
			return $http.get(uri,{headers:headers})
				.then(function(resp){
					//success
					return {success:true,list:resp.data.list};
				},function(){
					//error
					return {success:false};
				});
		},
		
		/**
		 * 
		 * GET
		 * Feed lists
		 * @param {object} cr : The user credentials
		 * @param {string} before : Latest entry creation timestamp
		 *
		 */
		feed : function(cr,before){
			
			var uri = '/lists?before='+before,
					headers = SignService.getSignedHeaders(uri,cr.key,cr.user._id);
			
			return $http.get(uri,{headers:headers})
				.then(function(resp){
					//success
					return {success:true,lists:resp.data.data};
				},function(){
					//error
					return {success:false};
				});
		},


		/**
		 *
		 * POST
		 * Add list
		 * @param {object} list : {title:'foo',items:[]}
		 * @param {object} cr : The user credentials
		 *
		 */
		add : function(list,cr){
			
			var uri = '/lists',
					headers = SignService.getSignedHeaders(uri,cr.key,cr.user._id,list);
			
			return $http.post(uri,list,{headers:headers})
				.then(function(resp){
					//success
					return {success:true,list:resp.data.list};
				},function(){
					//error
					return {success:false};
				});
		},


		/**
		 *
		 * PUT
		 * Add item
		 * @param {object} item : the list item {text:'foo',done:false}
		 * @param {object} list : The list
		 * @param {object} cr : The user credentials
		 *
		 */
		addItem : function(item,list,cr){
			
			var uri = '/lists/'+list._id,
					data = { new_items : [item]	};

			var headers = SignService.getSignedHeaders(uri,cr.key,cr.user._id,data);
			
			return $http.put(uri,data,{headers:headers})
				.then(function(resp){
					//success
					return {success:true,items:resp.data.items};
				},function(){
					//error
					return {success:false};
				});
		},


		/**
		 *
		 * PUT
		 * Set item done undone
		 * @param {object} item : the list item {text:'foo',done:false}
		 * @param {object} list : The list
		 * @param {object} cr : The user credentials
		 *
		 */
		mark : function(item,list,cr){
			
			var uri = '/lists/'+list._id,
					data = { item_done : item._id, done: item.done	};

			var headers = SignService.getSignedHeaders(uri,cr.key,cr.user._id,data);
			
			return $http.put(uri,data,{headers:headers})
				.then(function(resp){
					//success
					return {success:true,items:resp.data.items};
				},function(){
					//error
					return {success:false};
				});
		}			

	};
}]);