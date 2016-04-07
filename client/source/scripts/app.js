/**
 *
 * The client app
 *
 */


/**
 * The dependency injection
 */
var app = angular.module('sendlist',
  [
    // Dependencies
    'ui.router',
    'uiSwitch',
    'facebook',
    'external',

    //directives
    'input-directives',
    'scroll-directive',

    //Settings
    'sendlist.settings',

    //Constants
    'sendlist.constants',

    // Services
    'sendlist.SessionService',
    'sendlist.AuthService',
    'sendlist.MultimediaService',
    'sendlist.ListsService',
    'sendlist.SignService',

    // Controllers
    'sendlist.MainController',
    'sendlist.LoginController',
    'sendlist.ListsController',
    'sendlist.NewListController'
  ]);


/**
 * Session Resolver,
 * Prevents access to a state if session is not ready
 */
var sessionResolver = 
  ['$q','ERRORS','$rootScope',
  function($q,ERRORS,$rootScope){
    if($rootScope.credentials.user){
      return $q.resolve(true);
    } else {
      return $q.reject(ERRORS.NOT_LOGGED_IN);
    }
  }];


/**
 * The app config
 */
app.config([ 
  '$stateProvider', 
  '$urlRouterProvider', 
  '$locationProvider',
  'FacebookProvider',
  'APP_KEYS',
  function( 
    $stateProvider, 
    $urlRouterProvider, 
    $locationProvider,
    FacebookProvider,
    APP_KEYS
  ){
  
  /**
   * Default route catch
   */
  $urlRouterProvider.otherwise('/not-found');

  /**
   * The router
   */  
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'html/login.html',
    controller: 'LoginController',
    resolve : {
      redirect : ['$q','ERRORS','$rootScope',
        function($q,ERRORS,$rootScope){
          if($rootScope.credentials.user){
            return $q.reject(ERRORS.ALREADY_LOGGED_IN);
          } else {
            return $q.resolve(true);
          }
        }]
    },
  })
  .state('lists', {
    url: '/',
    templateUrl: 'html/lists.html',
    controller: 'ListsController',
    resolve : {
      sessionResolver : sessionResolver
    }
  })
  .state('list', {
    'url' : '/list/:id',
    templateUrl :'html/list.html',
    params: {list: null},
    controller: 'NewListController',
    resolve : {
      sessionResolver : sessionResolver
    }
  })
  .state('not-found', {
    url: '/not-found',
    templateUrl: 'html/not-found.html'
  });  


  /**
   * Pretty URLS
   */  
  $locationProvider.html5Mode(true);

  /**
   * Facebook setup
   */
  FacebookProvider.init(APP_KEYS.facebook);  

}]);


/**
 * The app
 */
app.run( [
  '$rootScope',
  '$state',
  'ERRORS',
  'EVENTS',
  'SessionService',
  'Facebook',
  'AuthService',
 function (
  $rootScope,  
  $state,  
  ERRORS,  
  EVENTS,  
  SessionService,
  Facebook,
  AuthService
  ) {

  /**
   *
   * Read session
   * And let children know
   */
  $rootScope.credentials = SessionService.read();
  if($rootScope.credentials.user){
    $rootScope.$broadcast(EVENTS.SESSION_READY,$rootScope.credentials);
  }

  /**
   *
   * Save session
   *
   */
  $rootScope.$on(EVENTS.LOGIN_SUCCESS,function(e,credentials){
    SessionService.store(credentials);
    $rootScope.credentials = SessionService.read();
    $rootScope.$broadcast(EVENTS.SESSION_READY,$rootScope.credentials);
    $state.go('lists');
  });


  /**
   *
   * Facebook login when SDK is ready
   *
   */
  var unregister = $rootScope.$watch(function() {
    return Facebook.isReady();
  }, function(newValue) {


    if(!newValue){
      return null;
    }

    if($rootScope.credentials.user){
      return null;
    }

    //Attempt Facebook login
    Facebook.getLoginStatus(function(fbresp) {
      
      unregister();

      if(fbresp.status !== 'connected') {
        return null;
      }

      AuthService.facebookSignup(fbresp.authResponse.accessToken)
        .then(function(resp){
          if(resp.success){
            //Let app know
            SessionService.store(resp.credentials);
            $rootScope.credentials = SessionService.read();
            $rootScope.$broadcast(EVENTS.SESSION_READY,$rootScope.credentials);
            $state.go('lists');
          }
        });

    });    
  });


  /**
   *
   * A hook to verify session error and
   * Display login page
   */
  $rootScope.$on('$stateChangeError', function(
    e, toState, toParams, fromState, fromParams, error){
      if(error === ERRORS.NOT_LOGGED_IN){
        $state.go("login");
      }
    });


  $rootScope.$on('$stateChangeError', function(
    e, toState, toParams, fromState, fromParams, error){
      if(error === ERRORS.ALREADY_LOGGED_IN){
        $state.go("lists");
      }
    });



}]);