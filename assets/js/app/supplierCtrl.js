(function(){
    var app = angular.module("app");
    var supplierCtrl = function($scope,supplierFactory){
        $scope.supplier = supplierFactory;


        var getSupplier = function () {
            supplierFactory.getData("getSupplier", undefined).
                then(function () {
                    console.log($scope.supplier);
                }, function () {
                    console.log("Error");
                });

        };
        getSupplier();

    };
    app.controller("supplierCtrl",["$scope","supplierFactory", supplierCtrl]);
}());