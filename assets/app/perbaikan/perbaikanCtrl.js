(function(){
    var app = angular.module("app");
    app.controller("perbaikanCtrl",["$scope","perbaikanFactory", function($scope, perbaikanFactory){
        $scope.dataPerbaikan=perbaikanFactory;

        $scope.viewData = function(){
            perbaikanFactory.getPerbaikan().then(
                function(){

                },function(){}
            );
        };
    }]);
}());