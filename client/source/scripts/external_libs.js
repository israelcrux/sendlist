/**
 *
 * External libraries
 *
 */
angular.module('external',[])

/**
 *
 * From https://github.com/Caligatio/jsSHA
 * Install with bower
 *
 */
.factory('jsSHA',function(){
	return window['jsSHA'];
})

/**
 *
 * Update an object
 *
 */
.factory('_update',function(){
	return function(srcObj, destObj) {
	  for (var key in destObj) {
	    if(destObj.hasOwnProperty(key) && srcObj.hasOwnProperty(key)) {
	      destObj[key] = srcObj[key];
	    }
	  }
	};
});