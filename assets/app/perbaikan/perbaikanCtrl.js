(function(){
    var app = angular.module("app");
    app.controller("perbaikanCtrl",["$scope","perbaikanFactory", function($scope, perbaikanFactory){
        $scope.dataPerbaikan=perbaikanFactory;
        $scope.status = {perbaikan :"Semua"};
        $scope.viewData = function(){
            perbaikanFactory.getPerbaikan().then(
                function(){
                console.log($scope.dataPerbaikan);
                },function(){}
            );
        };

        $scope.detail = function(obj){
            perbaikanFactory.objPerbaikan = obj;
        };

        $scope.isCollapse = false;
        $scope.collapsePanel = function(){
            $scope.isCollapse = !$scope.isCollapse;
        };
    }]);
}());