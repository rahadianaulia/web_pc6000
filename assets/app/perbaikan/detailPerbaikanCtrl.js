(function(){
    var app = angular.module("app");
    app.controller("detailPerbaikanCtrl",["$scope","perbaikanFactory", function($scope, perbaikanFactory){
        $scope.objPerbaikan = perbaikanFactory.objPerbaikan;
        $scope.disableInput = true;
    }]);
}());