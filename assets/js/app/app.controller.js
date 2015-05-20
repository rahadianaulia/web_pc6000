/**
 * Created by skylab on 21/05/2015.
 */
(function(){
    var app = angular.module("app");
    var appCtrl = function($scope){
        $scope.judul = "Karambiacukia";
        $scope.template = "home.html";
    };
    app.controller("appCtrl",["$scope",appCtrl]);
}());