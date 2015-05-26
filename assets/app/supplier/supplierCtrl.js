(function(){
    var app = angular.module("app");
    var supplierCtrl = function($scope,$routeParams,$location, supplierFactory){
        $scope.respons = supplierFactory;
        var getSupplier = function () {
            supplierFactory.getData("getSupplier", undefined).
                then(function () {
                }, function () {
                    console.log("Error");
                });
        };
        if($location.path() === "/supplier"){
            getSupplier();
        }
        $scope.edit= function(item){
            supplierFactory.objSupplier = item;
        };
    };
    app.controller("supplierCtrl",["$scope", "$routeParams","$location","supplierFactory", supplierCtrl]);
}());