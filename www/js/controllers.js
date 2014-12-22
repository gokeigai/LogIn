angular.module('starter.controllers', [])

.controller('SignInCtrl', function($scope, $http, $templateCache, $localstorage) {
  
  $scope.signIn = function(user) {
	var token_url = "https://learndev.vch.ca/m2/vch_custom/016_app/logging_in.php";
	
	$http({method: "POST", url: token_url, data: {'username': user.username, 'password': user.password, 'service': 'take5'}, cache: $templateCache}).success(function(result){
		
		//if log in is accepted
		console.log("Logged in");
		$localstorage.setObject('token', result);
		console.log($localstorage.getObject('token').token);
		console.log($localstorage.getObject('token').userid);
		
	}).error(function(result){
		console.log(result);
		//if log is not accepted
		alert("Your username or password is incorrect. Please re-enter.");
	});
  };
    
})

.controller('HomeCtrl', function($scope, $http, $templateCache, $localstorage) {
    
})