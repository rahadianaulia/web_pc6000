(function(){
    var app = angular.module("app");
    app.controller("editSupplierCtrl", ["$scope","supplierFactory", function($scope, supplierFactory){
        $scope.itemSup = supplierFactory.objSupplier;

        $scope.editSupplier = function(supplier){
            console.log(supplier);
            var data = {"id":supplier.idsuplier, "nama" : supplier.nama,"alamat" : supplier.alamat, "telp" : supplier.telp };
            console.log(data);
            supplierFactory.getData("updateSupplier",JSON.stringify(data)).
                then(function(){
                    console.log(supplierFactory.listSupplier);
                },function(){});
        };
    }]);
}());
