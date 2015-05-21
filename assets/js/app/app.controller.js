/**
 * Created by skylab on 21/05/2015.
 */
(function(){
    var app = angular.module("app");
    var appCtrl = function($scope, $location){
		$scope.isActive=function(viewLocation){
			return viewLocation ===$location.path();
		};
    };
    app.controller("appCtrl",["$scope","$location",appCtrl]);
}());