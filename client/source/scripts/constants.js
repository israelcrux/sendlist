/**
 *
 * Sendlist constants
 *
 */

angular.module('sendlist.constants',[])

/**
 * ERRORS
 */
.constant('ERRORS',{
	NOT_LOGGED_IN: 'user not logged in',
	ALREADY_LOGGED_IN: 'user already logged in'
})

/**
 * Events
 */
.constant('EVENTS',{
	LOGIN_SUCCESS: 'login successful',
	SESSION_READY: 'session ready'
})

/**
 * User messages
 */
.constant('MESSAGES',{
	SERVER_ERROR: 'There was an error, please try again'
});