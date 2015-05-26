(function(){
    var app = angular.module("app");
    app.controller("editSupplierCtrl", ["$scope","$location","supplierFactory", function($scope,$location, supplierFactory){
        html5Mode(true);
        $scope.itemSup = supplierFactory.objSupplier;
        $scope.simpan = function(){
            supplierFactory.getData("updateSupplier",JSON.stringify($scope.itemSup)).
                then(function(){
                    if(supplierFactory.listSupplier==1){
                        alert("Update Berhasil");
                        $location.path("/supplier");
                    }
                },function(){});
        };
    }]);
}());
