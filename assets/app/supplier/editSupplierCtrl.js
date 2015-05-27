(function(){
    var app = angular.module("app");
    app.controller("editSupplierCtrl", ["$scope","$location","supplierFactory", function($scope,$location, supplierFactory){
        $scope.itemSup = supplierFactory.objSupplier;
        $scope.cancel = function(){
            $location.path("/supplier");
        };
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
