// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic', 'starter.controllers'])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.run(function($ionicPlatform, $http, $localstorage, $state) {
  if($localstorage.getObject('token') !== null && typeof $localstorage.getObject('token').token !== 'undefined') {
    // User has a token 
    var course_url ="https://learndev.vch.ca/m2/vch_custom/016_app/webservice.php?wstoken="+$localstorage.getObject('token').token+"&wsfunction=core_enrol_get_users_courses&userid="+$localstorage.getObject('token').userid+"&moodlewsrestformat=json";
  
    $http.get(course_url).success(function(result){
          console.log(result);
          if(typeof result[0].fullname !== 'undefined') {
            console.log('User exists');
            $state.go('app.home');
	          //TODO Switch to Home View (app.home)
          } else {         
            //TODO Let the user continue to login
            $localstorage.delete('token').token;
            $localstorage.delete('token').userid;
          }
    });
  }
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider,$urlRouterProvider) {

  $stateProvider.state('app', {
    abstract: true,
    templateUrl: 'index.html'
  })

  $stateProvider.state('app.login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'SignInCtrl'
  })

  $stateProvider.state('app.home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  });

  $urlRouterProvider.otherwise("/login");
})