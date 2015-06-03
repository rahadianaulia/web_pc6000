(function(){
    var app = angular.module("app");
    app.controller("editSupplierCtrl", ["$scope","$location","supplierFactory", function($scope,$location, supplierFactory){
        if(supplierFactory.objSupplier.idsuplier==undefined){
            $location.path("/supplier");
        }
        $scope.itemSup = supplierFactory.objSupplier;
        $scope.cancel = function(){
            $location.path("/supplier");
        };
        $scope.simpan = function(){
            supplierFactory.editSupplier(JSON.stringify($scope.itemSup)).
                then(function(){
                    if(supplierFactory.respon==1){
                        alert("Update Berhasil");
                        $location.path("/supplier");
                    }
                },function(){});
        };
    }]);
}());
