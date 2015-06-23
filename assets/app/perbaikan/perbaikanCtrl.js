(function(){
    var app = angular.module("app");
    app.controller("perbaikanCtrl",["$scope","perbaikanFactory", function($scope){
        $scope.status = {perbaikan :"Semua"};
        $scope.isCollapse = false;
        $scope.collapsePanel = function(){
            $scope.isCollapse = !$scope.isCollapse;
        };
    }]);
}());